module Leaderboard
  module GetEntryDetails
    def get_entry_details(entry_id)
      redis.hgetall(entry_key(entry_id))
           .merge(rank: get_entry_rank(entry_id))
    end

    protected

    def get_entry_rank(entry_id)
      redis.zrevrank(LEADERBOARD_TAG, entry_key(entry_id)).to_i + 1
    end
  end
end
