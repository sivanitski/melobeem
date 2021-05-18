module Competitions
  class PrizesQuery
    REVENUE_PRIZE_PART = 0.015

    attr_reader :competition

    def initialize(competition)
      @competition = competition
    end

    def call
      money_prizes = calculate_money_prizes
      {
        money_prizes: [{ first_prize: money_prizes.first },
                       { second_prize: money_prizes.second },
                       { third_prize: money_prizes.last }],
        not_money_prizes: not_money_prizes
      }
    end

    private

    def calculate_money_prizes
      revenue_in_dollars = (competition.revenue * pound_dollar_rate).round
      first_prize = (competition.prize_cents + revenue_in_dollars * REVENUE_PRIZE_PART).to_i
      money_prizes = []
      second_prize, third_prize = MONEY_PRIZES.detect { |k, _v| k.include? first_prize }&.last

      money_prizes.push(first_prize, second_prize, third_prize)

      money_prizes
    end

    def pound_dollar_rate
      OXR.update_rates
      OXR.get_rate('GBP', 'USD')
    end

    def not_money_prizes
      ADDITIONAL_PRIZES.each_with_object([]) do |(key, val), arr|
        arr << { range: key.to_a.values_at(0, -1), prize: val }
      end
    end
  end
end
