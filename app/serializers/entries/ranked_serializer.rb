module Entries
  class RankedSerializer < Entries::BaseSerializer
    attributes :id, :gender, :name, :image_url, :total_votes, :rank, :username
  end
end