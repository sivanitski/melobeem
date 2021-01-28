module Leaderboard
  module SetEntryDetails
    def setup_entry_details(entry)
      redis.mapped_hmset(entry_key(entry.id), details(entry))
    end

    protected

    def details(entry)
      {
        id: entry.id,
        gender: entry.gender,
        competition_id: entry.competition_id
      }
    end
  end
end
