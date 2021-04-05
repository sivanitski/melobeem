module Spins
  class Buy
    SPINS_TO_AMOUNT = { '5' => 600, '10' => 1000 }.freeze

    def call(params:, user:)
      create_intent(entry: Competition.current!.entries.find_by(user: user),
                    user: user, value: params[:value])
    end

    def create_intent(entry:, value:, user:)
      intent = Stripe::PaymentIntent.create(amount: SPINS_TO_AMOUNT[value],
                                            description: "Buying #{value} spins", currency: 'gbp',
                                            metadata: { user_id: user.id, entry_id: entry.id, value: value,
                                                        username: user.name, email: user.email })

      raise(Stripe::CardError.new(intent.error.message, intent, http_status: 500)) if intent.try(:id).blank?

      create_transaction(intent)
      { client_secret: intent.client_secret }.to_json
    end

    def create_transaction(intent)
      PurchaseTransaction.create!(intent_id: intent.id, amount: intent.amount, amount_received: intent.amount_capturable,
                                  status: :process, full_info: intent.to_json, value: intent.metadata[:value].to_i,
                                  user_id: intent.metadata[:user_id].to_i, entry_id: intent.metadata[:entry_id].to_i)
    end
  end
end
