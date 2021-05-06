module Entries
  class TotalVotesByDateSerializer < ActiveModel::Serializer
    attributes :total_count, :vote_date
  end
end
