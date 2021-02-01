module Leaderboard
  module GetNearEntries
    attr_accessor :ranks

    def get_near_entries(entry_id)
      setup_ranks(entry_id)

      index = -1
      get_near_entries_collection.map do |redis_key|
        index += 1
        redis.hgetall(redis_key).merge(
          rank: ranks[index] + 1,
          direction: next_or_previous(ranks[index])
        )
      end
    end

    protected

    def next_or_previous(rank)
      return 'previous' if rank > ranks[1]
      return 'next' if rank < ranks[1]

      'current'
    end

    def setup_ranks(entry_id)
      current_entry_rank = get_entry_rank(entry_id)

      @ranks = [
        current_entry_rank.positive? ? current_entry_rank - 1 : 0,
        current_entry_rank.zero? ? 1 : current_entry_rank,
        current_entry_rank.zero? ? 2 : current_entry_rank + 1
      ]
    end

    def get_entry_rank(entry_id)
      redis.zrevrank(LEADERBOARD_TAG, entry_key(entry_id)).to_i
    end

    def get_near_entries_collection
      redis.zrevrange(LEADERBOARD_TAG, ranks.first, ranks.last)
    end
  end
end
