module API
  module V1
    class WebhooksController < API::V1::ApplicationController
      skip_before_action :authenticate_user!
      skip_before_action :verify_authenticity_token

      rescue_from JSON::ParserError, with: :invalid_payload
      rescue_from Stripe::SignatureVerificationError, with: :invalid_signature
      rescue_from ActiveRecord::RecordNotFound, with: :nonexistent_transaction

      def check_payment_status
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        result = Votes::CreatePaid.new.call(payload: payload, sig_header: sig_header)
        render json: result.value, status: :created if Success
      end

      private

      def invalid_payload
        render json: { message: 'Invalid payload' }, status: :bad_request
      end

      def invalid_signature
        render json: { message: 'Invalid signature' }, status: :bad_request
      end

      def nonexistent_transaction
        render json: { message: 'Could not find PurchaseTransaction' }, status: :not_found
      end
    end
  end
end
