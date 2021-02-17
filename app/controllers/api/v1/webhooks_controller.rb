module API
  module V1
    class WebhooksController < API::V1::ApplicationController
      skip_before_action :authenticate_user!
      skip_before_action :verify_authenticity_token

      rescue_from JSON::ParserError, with: :invalid_payload
      rescue_from Stripe::SignatureVerificationError, with: :invalid_signature

      def check_payment_status
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        result = Votes::CreatePaid.new.call(payload: payload, sig_header: sig_header)

        case result
        when Success
          render json: result.value, status: :created
        else
          render json: { message: result.error }, status: :unprocessable_entity
        end
      end

      private

      def invalid_payload
        render json: { message: 'Invalid payload' }, status: :bad_request
      end

      def invalid_signature
        render json: { message: 'Invalid signature' }, status: :bad_request
      end
    end
  end
end
