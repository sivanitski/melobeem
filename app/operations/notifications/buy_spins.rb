module Notifications
  class BuySpins
    attr_reader :transaction

    def initialize(transaction)
      @transaction = transaction
    end

    def call
      Notification.create!(source_type: :purchase,
                           user: transaction.user,
                           entry: transaction.entry,
                           payload: payload(transaction))
    end

    private

    def payload(transaction)
      {
        spins_count: transaction.value
      }
    end
  end
end
