module API
  module V1
    class WebhooksController < API::V1::ApplicationController
      skip_before_action :authenticate_api_v1_user!
      skip_before_action :verify_authenticity_token
      # rubocop:disable Metrics/MethodLength
      def check_payment_status
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        wh_secret = ENV['STRIPE_ENDPOINT_SECRET']

        # rubocop: disable Lint/UselessAssignment
        begin
          event = Stripe::Webhook.construct_event(payload, sig_header, wh_secret)
        rescue JSON::ParserError => e
          render status: :bad_request, json: { msg: 'Invalid payload' }
        rescue Stripe::SignatureVerificationError => e
          render status: :bad_request, json: { msg: 'Invalid signature' }
        end

        # rubocop: enable Lint/UselessAssignment
        case event['type']
        when 'payment_intent.succeeded'
          intent = event['data']['object']
          find_transaction(intent)
        end
      end

      private

      def find_transaction(intent)
        transaction = PurchaseTransaction.find_by(intent_id: intent.id)

        if transaction.present?
          transaction.update!(amount_received: intent.amount_received, status: :done)
          enroll_votes(transaction)
        else
          @status = 400
          @message = 'Cannot find transaction'
        end

        render json: { message: @message }, status: @status
      end

      def enroll_votes(transaction)
        ActiveRecord::Base.transaction do
          entry = Entry.find(transaction.entry_id)
          entry.votes.build(entry_id: transaction.entry_id, user_id: transaction.user_id, value: transaction.vote_value)
          entry.save
          @status = 200
          @message = 'Votes were enrolled successfully'
        end
      rescue StandardError => e
        @status = 400
        @msg = "Something went wrong: #{e.try(:to_s)}"
      end

      # rubocop:enable Metrics/MethodLength
    end
  end
end
