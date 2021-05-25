module Competitions
  class CurrentSerializer < BaseSerializer
    attributes :id, :ends_at, :prize_cents, :created_at, :prize_currency

    def prize_cents
      object.prize.exchange_to(current_country.currency_code).cents
    end

    def prize_currency
      current_country.currency.code
    end
  end
end
