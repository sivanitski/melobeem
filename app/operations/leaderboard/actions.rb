module Leaderboard
  LEADERBOARD_TAG = 'leaderboard'.freeze

  class Actions
    extend IncrementScore
    extend DecrementScore
    extend GetEntryDetails
    extend GetCollection
    extend SetEntryDetails
    extend DestroyEntry

    class << self
      def redis
        @redis ||= Redis.current
      end

      def entry_key(entry_id)
        "entry:#{entry_id.to_s.gsub('entry:', '')}"
      end
    end
  end
end
