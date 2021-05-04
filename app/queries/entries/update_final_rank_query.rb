module Entries
  class UpdateFinalRankQuery
    def call(competition_id)
      query = <<~SQL.squish
                      UPDATE entries SET final_rank = ranked_entries.rank
                FROM (
        SELECT entries.id, RANK() OVER (ORDER BY total_votes DESC) AS rank
                    FROM entries
                    WHERE entries.competition_id = #{competition_id}
                ) AS ranked_entries
                    WHERE entries.id = ranked_entries.id
      SQL
      ActiveRecord::Base.connection.execute(query)
    end
  end
end
