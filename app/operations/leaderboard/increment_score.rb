module Leaderboard
  module IncrementScore
    def increment_score(value, entry_id)
      redis.zadd(LEADERBOARD_TAG, value, entry_key(entry_id), incr: true)
    end
  end
end
