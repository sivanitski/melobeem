module Entries
  class CurrentSerializer < Entries::BaseSerializer
    attributes :id, :image_url, :name, :level, :total_votes, :rank
  end
end
