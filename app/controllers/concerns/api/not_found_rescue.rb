module API
  module NotFoundRescue
    extend ActiveSupport::Concern

    included do
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      protected

      def record_not_found(error)
        render json: { success: false, message: error.message }, status: :not_found
      end
    end
  end
end
