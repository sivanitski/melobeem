module Spins
  class Buy
    def call(user:, product:)
      create_intent(entry: Competition.current!.entries.find_by(user: user),
                    user: user, product: product)
    end

    def create_intent(entry:, product:, user:) # rubocop:disable Metrics/AbcSize
      intent = Stripe::PaymentIntent.create(amount: product_price(product),
                                            currency: product.price_currency,
                                            payment_method_types: ['card'],
                                            description: "Buying #{product.value} spins",
                                            metadata: { user_id: user.id, entry_id: entry.id, value: product.value,
                                                        username: user.name, email: user.email, product_id: product.id,
                                                        competition: Competition.current!.id })

      raise(Stripe::CardError.new(intent.error.message, intent, http_status: 500)) if intent.try(:id).blank?

      transaction = create_transaction(intent)

      return_object(intent, transaction, product)
    end

    def create_transaction(intent) # rubocop:disable Metrics/AbcSize
      PurchaseTransaction.find_or_create_by!(intent_id: intent.id, amount: intent.amount, amount_received: intent.amount_capturable,
                                             status: :process, full_info: intent.to_json, value: intent.metadata[:value].to_i,
                                             user_id: intent.metadata[:user_id].to_i, entry_id: intent.metadata[:entry_id].to_i,
                                             product_id: intent.metadata[:product_id].to_i, product_type: :spin,
                                             competition: Competition.current!)
    end

    def return_object(intent, transaction, product)
      {
        client_secret: intent.client_secret,
        id: intent['id'],
        purchase_transaction_id: transaction.id,
        price_cents: product_price(product),
        price_currency: product.price_currency.downcase,
        product_title: product.title,
        country: product.country
      }.to_json
    end

    def product_price(product)
      return product.price_cents if event.blank?

      product.discounted_price_cents
    end

    def event
      @event ||= Event.today
    end
  end
end
