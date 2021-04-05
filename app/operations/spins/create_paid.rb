module Spins
  class CreatePaid
    WH_SECRET = ENV.fetch('STRIPE_ENDPOINT_SECRET') { raise 'NO STRIPE TOKEN, CANNOT START APPLICATION' }

    def call(payload:, sig_header:) # rubocop:disable Metrics/MethodLength
      intent = fetch_event(payload: payload, sig_header: sig_header)
      transaction = find_transaction(intent.id)
      user = transaction.user
      user.premium_spins = transaction.value

      ActiveRecord::Base.transaction do
        transaction.update!(amount_received: intent.amount_received, status: :done)
        user.save!
        Notifications::BuySpins.new(transaction).call
      end

      Success.new(user.premium_spins)
    rescue ActiveRecord::ActiveRecordError => e
      Failure.new(e.message)
    end

    private

    def fetch_event(payload:, sig_header:)
      event = Stripe::Webhook.construct_event(payload, sig_header, WH_SECRET)

      case event['type']
        # change to payment_intent.succeeded, here is used  created for demo
      when 'payment_intent.created'
        event['data']['object']
      end
    end

    def find_transaction(intent_id)
      PurchaseTransaction.find_by!(intent_id: intent_id)
    end
  end
end
