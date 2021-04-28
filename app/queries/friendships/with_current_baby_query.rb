module Friendships
  class WithCurrentBabyQuery
    def call(collection)
      collection.joins(join_scope).select('users.*, entries.current_baby_name as current_baby_name')
    end

    private

    def join_scope
      <<~SQL.squish
        LEFT JOIN LATERAL (
          SELECT entries.name as current_baby_name
          FROM entries
          WHERE entries.user_id = users.id
          AND entries.competition_id IN (
            SELECT competitions.id
            FROM competitions
            WHERE competitions.status = 'started'
          )
          LIMIT 1
        ) AS entries ON TRUE
      SQL
    end
  end
end
