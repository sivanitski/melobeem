module Votes
  class Buy
    VOTES_TO_AMOUNT = { '10' => 1000, '20' => 2000, '50' => 5000 }.freeze

    def call(params:, user:)
      create_intent(entry_id: params[:entry_id], vote_value: params[:vote_value], user: user)
    end

    private

    def create_intent(entry_id:, vote_value:, user:) # rubocop:disable Metrics/AbcSize
      customer_id = retrieve_customer_id(user)
      intent = Stripe::PaymentIntent.create(amount: VOTES_TO_AMOUNT[vote_value], customer: customer_id,
                                            description: "Buying #{vote_value} votes", currency: 'gbp',
                                            metadata: { user_id: user.id, entry_id: entry_id, vote_value: vote_value,
                                                        username: user.name, email: user.email,
                                                        competition: Competition.current!.id })

      raise(Stripe::CardError.new(intent.error.message, intent, http_status: 500)) if intent.try(:id).blank?

      create_transaction(intent)
      { client_secret: intent.client_secret, id: intent['id'] }.to_json
    end

    def create_transaction(intent)
      PurchaseTransaction.create!(intent_id: intent.id, amount: intent.amount, amount_received: intent.amount_capturable,
                                  status: :process, full_info: intent.to_json, value: intent.metadata[:vote_value].to_i,
                                  user_id: intent.metadata[:user_id].to_i, entry_id: intent.metadata[:entry_id].to_i,
                                  product_type: :vote, competition: Competition.current!)
    end

    def create_customer(user)
      Stripe::Customer.create({ email: user.email, description: user.id })
    end

    def retrieve_customer_id(user)
      return user.stripe_customer_id if user.stripe_customer_id.present?

      customer = create_customer(user)
      user.update!(stripe_customer_id: customer.id)
      user.stripe_customer_id
    end
  end
end
