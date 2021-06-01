module Votes
  class CreatePaid
    def call(transaction:, amount_received:) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      if amount_received.present?
        transaction.update!(amount_received: amount_received)
        Competition.current!.increment_revenue!(transaction)
      end

      return Success.new(transaction.product.value) if transaction.reload.done?

      vote = build_vote(transaction.values_at(:entry_id, :user_id, :value))

      ActiveRecord::Base.transaction do
        transaction.update!(status: :done)
        vote.save!
        vote.apply!
        Notifications::BuyVotes.new(vote).call
      end

      Success.new(vote.value)
    rescue ActiveRecord::ActiveRecordError => e
      Failure.new(e.message)
    end

    private

    def build_vote(transaction)
      entry_id, user_id, value = transaction
      Vote.new(entry_id: entry_id, user_id: user_id, value: value, source_type: 'shop')
    end
  end
end
