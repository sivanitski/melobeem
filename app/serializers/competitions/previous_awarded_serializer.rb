module Competitions
  class PreviousAwardedSerializer < BaseSerializer
    attributes :id, :name, :total_votes, :final_rank, :competition_money_prize_cents, :competition_additional_prize,
               :user_name, :image_url, :competition_starts_at, :competition_prize_sum, :competition_money_currency

    def user_name
      object.user.name
    end

    def image_url
      image_path(object.image)
    end

    def competition_starts_at
      object.competition.starts_at
    end

    def competition_prize_sum
      object.competition.money_prizes_final_sum
    end

    def competition_money_currency
      return '$' if current_country.blank?

      current_country.currency.code
    end

    def competition_money_prize_cents
      return 0 if object.competition_money_prize.zero?
      return object.competition_money_prize if current_country.blank?

      object.competition_money_prize.exchange_to(current_country.currency_code).cents
    end
  end
end
