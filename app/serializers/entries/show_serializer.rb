module Entries
  class ShowSerializer < Entries::BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :level
  end
end
