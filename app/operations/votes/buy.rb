module Votes
  class Buy
    VOTES_TO_AMOUNT = { '10' => 1000, '20' => 2000, '50' => 5000 }.freeze

    def initialize(params:, user:)
      @email = user.email
      @entry_id = params[:entry_id]
      @user = user
      @vote_value = params[:vote_value]
    end

    def call
      Stripe.api_key
      create_intent
    end

    private

    attr_accessor :user, :email, :entry_id, :vote_value

    # rubocop:disable Metrics/AbcSize
    def create_intent
      intent = Stripe::PaymentIntent.create(amount: VOTES_TO_AMOUNT[vote_value],
                                            description: user.email, currency: 'gbp',
                                            metadata: { user_id: user.id, entry_id: entry_id, vote_value: vote_value })

      raise(Stripe::CardError.new(intent.error.message, intent, http_status: 500)) if intent.try(:id).blank?

      create_transaction(intent)
      { client_secret: intent.client_secret }.to_json # key for front, POST "/api/v1/charges"
    end

    # rubocop:enable Metrics/AbcSize

    def create_transaction(intent)
      PurchaseTransaction.create!(intent_id: intent.id, amount: intent.amount, amount_captured: intent.amount_capturable,
                                  status: :process, full_info: intent.to_json, vote_value: intent.metadata[:vote_value].to_i,
                                  user_id: intent.metadata[:user_id].to_i, entry_id: intent.metadata[:entry_id].to_i)
    end
  end
end
