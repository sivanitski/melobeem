module Entries
  class RankedSerializer < Entries::BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :rank, :username, :level, :user_id, :avatar_url,
               :current_competition, :competition_money_prize_cents, :competition_money_currency,
               :competition_additional_prize, :spent_competition_additional_prize

    def avatar_url
      image_path(object.user.avatar)
    end

    def current_competition
      object.competition == Competition.current!
    end

    def competition_money_currency
      return '$' if current_country.blank?

      current_country.currency.code
    end

    def competition_money_prize_cents
      return 0 if object.competition_money_prize.zero?
      return object.competition_money_prize if current_country.blank?

      money = Money.new(object.competition_money_prize, 'USD')
      money.exchange_to(current_country.currency_code).cents
    end
  end
end
