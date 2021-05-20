module Votes
  class CreatePaid
    WH_SECRET = ENV.fetch('STRIPE_ENDPOINT_SECRET') { raise 'NO STRIPE TOKEN, CANNOT START APPLICATION' }

    def call(payload:, sig_header:) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      intent = fetch_event(payload: payload, sig_header: sig_header)
      transaction = find_transaction(intent.id)
      vote = build_vote(transaction.values_at(:entry_id, :user_id, :value))

      ActiveRecord::Base.transaction do
        transaction.update!(amount_received: intent.amount_received, status: :done)
        vote.save!
        vote.apply!
        Notifications::BuyVotes.new(vote).call
        Competition.current!.increment_revenue!(transaction)
      end

      Success.new(vote.value)
    rescue ActiveRecord::ActiveRecordError => e
      Failure.new(e.message)
    end

    private

    def fetch_event(payload:, sig_header:)
      event = Stripe::Webhook.construct_event(payload, sig_header, WH_SECRET)

      case event['type']
      when 'payment_intent.succeeded'
        event['data']['object']
      end
    end

    def find_transaction(intent_id)
      PurchaseTransaction.find_by!(intent_id: intent_id, product_type: :vote)
    end

    def build_vote(transaction)
      entry_id, user_id, value = transaction
      Vote.new(entry_id: entry_id, user_id: user_id, value: value, source_type: 'shop')
    end
  end
end
