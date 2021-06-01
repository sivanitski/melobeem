module Buy
  class CompletePurchase
    attr_accessor :transaction, :amount_received

    def initialize(transaction:, amount_received:)
      @transaction = transaction
      @amount_received = amount_received
    end

    def call
      options = { transaction: transaction, amount_received: amount_received }

      return Votes::CreatePaid.new.call(options) if transaction.vote?

      return Spins::CreatePaid.new.call(options) if transaction.spin?

      Failure.new({ error: 'Vote type was not recognized' })
    end
  end
end
