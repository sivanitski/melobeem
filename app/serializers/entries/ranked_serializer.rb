module Entries
  class RankedSerializer < Entries::BaseSerializer
    attributes :id, :gender, :name, :image_url, :total_votes, :rank, :username, :level

    def level
      # stub
    end
  end
end
