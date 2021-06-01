module API
  module V1
    class WebhooksController < API::V1::ApplicationController
      skip_before_action :authenticate_user!
      skip_before_action :verify_authenticity_token

      rescue_from JSON::ParserError, with: :invalid_payload
      rescue_from Stripe::SignatureVerificationError, with: :invalid_signature

      def check_payment
        intent = fetch_event
        transaction = find_transaction(intent.id)

        result = Buy::CompletePurchase.new(transaction: transaction, amount_received: intent.amount_received).call

        case result
        when Success
          render json: result.value, status: :created
        else
          render json: { message: result.error }, status: :unprocessable_entity
        end
      end

      private

      def find_transaction(intent_id)
        PurchaseTransaction.find_by!(intent_id: intent_id)
      end

      def payload
        @payload ||= request.body.read
      end

      def fetch_event
        secret = ENV.fetch('STRIPE_ENDPOINT_SECRET') { raise 'NO STRIPE TOKEN, CANNOT START APPLICATION' }

        event = Stripe::Webhook.construct_event(payload, sig_header, secret)

        case event['type']
        when 'payment_intent.succeeded'
          event['data']['object']
        end
      end

      def sig_header
        @sig_header ||= request.env['HTTP_STRIPE_SIGNATURE']
      end

      def invalid_payload
        render json: { message: 'Invalid payload' }, status: :bad_request
      end

      def invalid_signature
        render json: { message: 'Invalid signature' }, status: :bad_request
      end
    end
  end
end
