module Votes
  class Buy
    VOTES_TO_AMOUNT = { '10' => 1000, '20' => 2000, '50' => 5000 }.freeze

    def initialize
      @stripe_api_key = Stripe.api_key
    end

    def call(params:, user:)
      create_intent(entry_id: params[:entry_id], vote_value: params[:vote_value], user: user)
    end

    private

    def create_intent(entry_id:, vote_value:, user:)
      intent = Stripe::PaymentIntent.create(amount: VOTES_TO_AMOUNT[vote_value],
                                            description: user.email, currency: 'gbp',
                                            metadata: { user_id: user.id, entry_id: entry_id, vote_value: vote_value })

      raise(Stripe::CardError.new(intent.error.message, intent, http_status: 500)) if intent.try(:id).blank?

      create_transaction(intent)
      { client_secret: intent.client_secret }.to_json # key for front, POST "/api/v1/charges"
    end

    def create_transaction(intent)
      PurchaseTransaction.create!(intent_id: intent.id, amount: intent.amount, amount_received: intent.amount_capturable,
                                  status: :process, full_info: intent.to_json, vote_value: intent.metadata[:vote_value].to_i,
                                  user_id: intent.metadata[:user_id].to_i, entry_id: intent.metadata[:entry_id].to_i)
    end
  end
end
