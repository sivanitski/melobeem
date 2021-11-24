module Competitions
  class PreviousWinnersQuery
    def call
      Entry.from(entry_scope, :winners)
           .select(*column_select)
           .joins('INNER JOIN competitions ON winners.competition_id = competitions.id')
           .where.not(competitions: { id: Competition.current! })
           .where('winners.rank = 1')
           .where('winners.deactivated = false')
           .order(competition_starts_at: :desc)
           .with_attached_image
    end

    private

    def column_select
      [
        'competitions.id AS competition_id',
        'competitions.title AS competition_title',
        'competitions.money_prizes_final_sum AS competition_prize_cents',
        'competitions.starts_at AS competition_starts_at',
        'winners.entries_count',
        'winners.deactivated',
        'winners.id',
        'winners.total_votes'
      ]
    end

    def entry_scope
      Entry.select(:id, :competition_id, :total_votes)
           .select('row_number() OVER (PARTITION BY competition_id ORDER BY total_votes DESC, id ASC) as rank, deactivated')
           .select('count(*) OVER (PARTITION BY competition_id) AS entries_count')
    end
  end
end
