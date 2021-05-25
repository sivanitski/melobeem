module API
  module GeoIp
    extend ActiveSupport::Concern

    COUNTRIES = %w[AU CA GB US FR ES].freeze

    included do
      def country
        @country ||= ISO3166::Country.new(country_code)
      end

      def geo_ip_country
        $geoip.country(request.remote_ip)&.country&.iso_code # rubocop:disable Style/GlobalVars
      rescue MaxMind::GeoIP2::AddressNotFoundError, IPAddr::AddressFamilyError
        DEFAULT_COUNTRY
      end

      def country_code
        geo_ip_country.upcase[0, 2][/#{COUNTRIES.join('|')}/i] || DEFAULT_COUNTRY
      rescue StandardError
        DEFAULT_COUNTRY
      end
    end
  end
end
