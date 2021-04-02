module API
  module V1
    class ChargesController < API::V1::ApplicationController
      rescue_from Stripe::CardError, with: :catch_exception

      def create
        result = Votes::Buy.new.call(params: charges_params, user: current_user)
        render json: result, adapter: nil, status: :ok
      end

      private

      def charges_params
        params.permit(:entry_id, :vote_value)
      end

      def catch_exception(exception)
        render json: { message: exception.message }, status: :not_acceptable
      end
    end
  end
end
