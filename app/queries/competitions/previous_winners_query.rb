module Competitions
  class PreviousWinnersQuery
    def call
      Entry.joins(:competition)
           .joins(inner_join)
           .select('entries.*, t.entries_count, competitions.starts_at AS starts_at, competitions.prize_cents AS prize_cents')
    end

    private

    def inner_join
      <<~SQL.squish
        INNER JOIN (
          SELECT
            competition_id,
            COUNT(*) AS entries_count,
            MAX(total_votes) AS total_votes
          FROM entries
          GROUP BY competition_id
        ) AS t ON t.competition_id = entries.competition_id AND t.total_votes = entries.total_votes
      SQL
    end
  end
end
