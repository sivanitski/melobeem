module API
  module V1
    class ChargesController < API::V1::ApplicationController
      rescue_from Stripe::CardError, with: :catch_exception

      def buy_votes
        result = Votes::Buy.new.call(params: vote_params, user: current_user)
        render json: result, adapter: nil, status: :ok
      end

      def buy_spins
        result = Spins::Buy.new.call(params: spin_params, user: current_user)
        render json: result, adapter: nil, status: :ok
      end

      private

      def vote_params
        params.permit(:entry_id, :vote_value)
      end

      def spin_params
        params.permit(:value)
      end

      def catch_exception(exception)
        render json: { message: exception.message }, status: :not_acceptable
      end
    end
  end
end
