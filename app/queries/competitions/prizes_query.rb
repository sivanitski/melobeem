module Competitions
  class PrizesQuery
    REVENUE_PRIZE_PART = 0.015

    attr_reader :competition, :country

    def initialize(competition:, country:)
      @competition = competition
      @country = country
    end

    def call
      money_prizes = calculate_money_prizes
      {
        money_prizes: [
          { prize: money_prizes.first, currency: country.currency.symbol, place: 1 },
          { prize: money_prizes.second, currency: country.currency.symbol, place: 2 },
          { prize: money_prizes.last, currency: country.currency.symbol, place: 3 }
        ],
        not_money_prizes: not_money_prizes
      }
    end

    private

    def calculate_money_prizes
      revenue = (competition.revenue * currency_rate).round

      first_prize = (competition.prize_cents + revenue * REVENUE_PRIZE_PART).to_i

      second_prize, third_prize = MONEY_PRIZES.detect { |k, _v| k.include? first_prize }&.last

      [first_prize, second_prize, third_prize]
    end

    def currency_rate
      Money.default_bank.get_rate('USD', country.currency_code)
    end

    def not_money_prizes
      ADDITIONAL_PRIZES.each_with_object([]) do |(key, val), arr|
        arr << { range: key.to_a.values_at(0, -1), prize: val }
      end
    end
  end
end
