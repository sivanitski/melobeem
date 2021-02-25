module Entries
  class TotalVotesByDateQuery
    attr_accessor :entry, :date

    def initialize(entry:, date:)
      @entry = entry
      @date = Time.zone.parse(date.presence || Time.current.to_s)
    end

    def call
      entry.votes.where('votes.created_at::date = ?::date', date).sum(:value)
    end
  end
end
