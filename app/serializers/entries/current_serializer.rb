module Entries
  class CurrentSerializer < Entries::BaseSerializer
    attributes :id, :image_url, :name, :level, :total_votes, :rank, :current_competition

    def current_competition
      object.competition == Competition.current!
    end
  end
end
