module Competitions
  class PreviousWinnersSerializer < BaseSerializer
    attributes :id, :title, :prize_cents, :prize_currency, :starts_at, :entries_count,
               :winner_id, :winner_total_votes, :winner_image_url

    def id
      object.competition_id
    end

    def title
      object.competition_title
    end

    def prize_cents
      return 0 if object.competition_prize_cents.zero?

      money = Money.new(object.competition_prize_cents, 'USD')
      money.exchange_to(current_country.currency_code).cents
    end

    def prize_currency
      current_country.currency.code
    end

    def starts_at
      object.competition_starts_at
    end

    def winner_id
      object.id
    end

    def winner_total_votes
      object.total_votes
    end

    def winner_image_url
      image_path(object.image)
    end
  end
end
