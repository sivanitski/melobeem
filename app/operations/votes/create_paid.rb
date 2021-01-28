module Votes
  class CreatePaid
    WH_SECRET = ENV.fetch('STRIPE_ENDPOINT_SECRET') { raise 'NO STRIPE TOKEN, CANNOT START APPLICATION' }

    def call(payload:, sig_header:)
      intent = fetch_event(payload: payload, sig_header: sig_header)
      transaction = find_transaction(intent)
      vote = create_paid_vote(transaction)
      Success.new(vote.value)
    end

    private

    def fetch_event(payload:, sig_header:)
      event = Stripe::Webhook.construct_event(payload, sig_header, WH_SECRET)

      case event['type']
      when 'payment_intent.succeeded'
        event['data']['object']
      end
    end

    def find_transaction(intent)
      transaction = PurchaseTransaction.find_by!(intent_id: intent.id)

      transaction.update!(amount_received: intent.amount_received, status: :done)

      transaction
    end

    def create_paid_vote(transaction)
      vote = transaction.entry.votes.build(entry_id: transaction.entry_id,
                                           user_id: transaction.user_id,
                                           value: transaction.vote_value)
      vote.save!
      vote
    end
  end
end
