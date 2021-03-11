module Users
  class FromOmniauth
    attr_accessor :auth

    def initialize(auth:)
      @auth = auth
    end

    def call
      User.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = user_email
        user.password = generate_password
        user.name = auth.info.name
        user.avatar = image_file
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
  end
end
