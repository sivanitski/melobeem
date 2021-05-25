module API
  module V1
    class ChargesController < API::V1::ApplicationController
      rescue_from Stripe::CardError, with: :catch_exception

      before_action :found_product

      def buy_votes
        result = Votes::Buy.new.call(params: vote_params, user: current_user, product: @product)
        render json: result, adapter: nil, status: :ok
      end

      def buy_spins
        result = Spins::Buy.new.call(user: current_user, product: @product)
        render json: result, adapter: nil, status: :ok
      end

      private

      def vote_params
        params.permit(:entry_id)
      end

      def catch_exception(exception)
        render json: { message: exception.message }, status: :not_acceptable
      end

      def found_product
        @product = Product.find(params[:product_id])
      end
    end
  end
end
