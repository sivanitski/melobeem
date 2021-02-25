module Entries
  class ShowSerializer < Entries::BaseSerializer
    attributes :id, :gender, :name, :image_url, :total_votes
  end
end
