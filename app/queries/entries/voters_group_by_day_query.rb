module Entries
  class VotersGroupByDayQuery
    attr_accessor :entry, :page, :per, :date

    def initialize(entry:, page:, per:, date:)
      @entry = entry
      @page = page
      @per = per
      @date = validate_date(date)
    end

    def call
      Vote.left_joins(:user)
          .select('votes.source_type, votes.user_id, users.name as user_name, sum(votes.value) AS vote_amount')
          .where(votes: { entry_id: entry.id })
          .where('votes.created_at::date = ?::date', date)
          .group('votes.source_type, votes.user_id, users.id')
          .order('max(votes.created_at) DESC')
          .page(page)
          .per(per).preload(user: { avatar_attachment: :blob })
    end

    private

    def validate_date(date)
      if date.blank?
        Time.current
      else
        Time.zone.parse(date)
      end
    end
  end
end
