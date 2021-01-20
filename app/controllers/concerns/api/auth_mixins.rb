module API
  module AuthMixins
    extend ActiveSupport::Concern

    included do
      protect_from_forgery with: :null_session

      rescue_from ActionController::InvalidAuthenticityToken, with: :unauthenticated_error

      protected

      def unauthenticated_error
        render json: 'Unauthorized', status: :unauthorized
      end
    end
  end
end
