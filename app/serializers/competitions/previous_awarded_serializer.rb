module Competitions
  class PreviousAwardedSerializer < BaseSerializer
    attributes :id, :name, :total_votes, :final_rank, :competition_money_prize, :competition_additional_prize,
               :user_name, :image_url, :competition_starts_at, :competition_prize_sum

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
  end
end
