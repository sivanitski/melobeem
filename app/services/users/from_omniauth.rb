require 'open-uri'

module Users
  class FromOmniauth
    attr_accessor :auth, :remote_ip

    def initialize(auth:, remote_ip:)
      @auth = auth
      @remote_ip = remote_ip
    end

    def call # rubocop:disable Metrics/AbcSize
      User.active.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = user_email
        user.password = generate_password
        user.name = auth.info.name
        user.avatar = image_file
        user.country = geo_ip_country
      end
    end

    private

    def image_file
      url = URI.parse(auth.info.image)
      filename = File.basename(url.path)
      file = url.open

      { io: file, filename: filename }
    rescue StandardError
      nil
    end

    def user_email
      auth.info.email.presence || ''
    end

    def generate_password
      Devise.friendly_token[0, 20]
    end

    def geo_ip_country
      $geoip.country(remote_ip)&.country&.iso_code # rubocop:disable Style/GlobalVars
    rescue MaxMind::GeoIP2::AddressNotFoundError, IPAddr::AddressFamilyError
      nil
    end
  end
end
