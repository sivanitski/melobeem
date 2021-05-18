module Entries
  class RankedSerializer < Entries::BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :rank, :username, :level, :user_id, :avatar_url,
               :current_competition, :competition_money_prize, :competition_additional_prize

    def avatar_url
      image_path(object.user.avatar)
    end

    def current_competition
      object.competition == Competition.current!
    end
  end
end
