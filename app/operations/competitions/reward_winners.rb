module Competitions
  class RewardWinners
    REVENUE_CASHBACK_PERCENT = 0.015
    PRIZE_PLACES = [1, 2, 3].freeze

    attr_reader :competition

    def initialize(competition)
      @competition = competition
    end

    def call # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      PRIZE_PLACES.each_with_index do |place, index|
        prizewinners = participants.select { |participant| participant.rank == place }
        prizes = calculate_prizes
        competition.update!(money_prizes_final_sum: prizes.sum)
        break if prizewinners.empty?

        case prizewinners.size
        when 1 then update_winners(prizewinners: prizewinners, prize: prizes[index])
        when 2 then update_winners(prizewinners: prizewinners, prize: ((prizes[index] + prizes[place]) / prizewinners.size).floor)
        else update_winners(prizewinners: prizewinners, prize: prizes.sum / prizewinners.size)
        end
      end
    end

    private

    def participants
      ::Entries::WithRankQuery.new.call(competition.id).where('rank <= ?', 3)
    end

    def update_winners(prizewinners:, prize:)
      prizewinners.each { |winner| winner.update!(competition_money_prize: prize) }
    end

    def calculate_prizes
      revenue_in_dollars = (competition.revenue * pound_to_dollar_rate).round
      first_prize = (competition.prize_cents + revenue_in_dollars * REVENUE_CASHBACK_PERCENT).to_i
      money_prizes = []
      second_prize, third_prize = MONEY_PRIZES.detect { |k, _v| k.include? first_prize }&.last

      money_prizes.push(first_prize, second_prize, third_prize)

      money_prizes
    end

    def pound_to_dollar_rate
      OXR.update_rates
      OXR.get_rate('GBP', 'USD')
    end
  end
end
