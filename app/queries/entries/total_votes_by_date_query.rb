module Entries
  class TotalVotesByDateQuery
    attr_accessor :entry, :per, :page

    def initialize(entry:, per:, page:)
      @entry = entry
      @per = per
      @page = page
    end

    def call
      entry.votes
           .select('created_at::date as vote_date, sum(value) as total_count')
           .group('created_at::date')
           .order('created_at::date DESC')
           .page(page)
           .per(per)
    end
  end
end
