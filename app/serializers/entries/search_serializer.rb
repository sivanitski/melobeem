module Entries
  class SearchSerializer < Entries::BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :username
  end
end
