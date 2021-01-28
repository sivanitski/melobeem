module Leaderboard
  module DecrementScore
    def decrement_score(value, entry_id)
      redis.zadd(LEADERBOARD_TAG, real_score(value, entry_id), entry_key(entry_id))
    end

    protected

    def real_score(value, entry_id)
      count_real_score(value, entry_id).positive? ? count_real_score(value, entry_id).to_i : 0
    end

    def current_score(entry_id)
      redis.zscore(LEADERBOARD_TAG, entry_key(entry_id))
    end

    def count_real_score(value, entry_id)
      current_score(entry_id) - value
    end
  end
end
