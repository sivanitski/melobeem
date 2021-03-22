module Competitions
  class PreviousWinnersQuery
    def call
        Competition.joins(joins)
          .select('competitions.id, title, starts_at, prize_cents, entries_count, winner_id')
          .page(0).per(4)
    end

    private

    def joins
      <<~SQL.squish
        INNER JOIN (
          SELECT
              id AS winner_id,
              competition_id,
              total_votes,
              entries_count
          FROM (
              SELECT
                  id,
                  competition_id,
                  total_votes,
                  row_number() OVER (PARTITION BY competition_id ORDER BY total_votes) AS place,
                  count(*) OVER (PARTITION BY competition_id) AS entries_count
              FROM
                  entries) AS s
          WHERE
              place = 1
        ) as w on competitions.id = w.competition_id
      SQL
    end
  end
end
