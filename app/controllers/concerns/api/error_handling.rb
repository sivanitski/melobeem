module API
  module ErrorHandling
    extend ActiveSupport::Concern

    included do
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_csrf_token

      private

      def record_not_found(error)
        render json: { error: error.message }, status: :not_found
      end

      def invalid_csrf_token(_error)
        render json: { error: 'Invalid CSRF Token' }, status: :forbidden
      end
    end
  end
end
