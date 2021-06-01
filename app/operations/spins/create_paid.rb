module Spins
  class CreatePaid
    def call(transaction:, amount_received:) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      if amount_received.present?
        transaction.update!(amount_received: amount_received)
        Competition.current!.increment_revenue!(transaction)
      end

      user = transaction.user

      return Success.new(user.premium_spins) if transaction.reload.done?

      user.premium_spins += transaction.value

      ActiveRecord::Base.transaction do
        transaction.update!(status: :done)
        user.save!
        Notifications::BuySpins.new(transaction).call
      end

      Success.new(user.premium_spins)
    rescue ActiveRecord::ActiveRecordError => e
      Failure.new(e.message)
    end
  end
end
