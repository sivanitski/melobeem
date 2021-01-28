module Leaderboard
  module DestroyEntry
    def destroy_entry(entry_id)
      redis.del(entry_key(entry_id))

      redis.zrem(LEADERBOARD_TAG, entry_key(entry_id))
    end
  end
end
