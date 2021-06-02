module Entries
  class WithRankQuery
    def call(competition_id, level = nil)
      entries = Entry.active.with_attached_image
                     .preload(:user)
                     .select('*')
                     .joins(entry_ranking(competition_id))
                     .order(:rank, :id)

      return entries if level.blank?

      entries.where(level: level)
    end

    private

    def entry_ranking(competition_id)
      <<~SQL.squish
        INNER JOIN (
          SELECT
            entries.id,
            RANK() OVER (ORDER BY total_votes DESC) AS rank,
            LAG(id) OVER (ORDER BY total_votes DESC) AS previous_id,
            LEAD(id) OVER (ORDER BY total_votes DESC) AS next_id
          FROM entries
          WHERE entries.competition_id = #{competition_id}
        ) AS ranked_entries ON entries.id = ranked_entries.id
      SQL
    end
  end
end
