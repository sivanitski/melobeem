module Entries
  class RankingDetailsSerializer < Entries::BaseSerializer
    attributes :id, :total_votes, :rank, :level
  end
end
