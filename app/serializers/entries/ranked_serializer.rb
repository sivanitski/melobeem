module Entries
  class RankedSerializer < Entries::BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :rank, :username, :level
  end
end
