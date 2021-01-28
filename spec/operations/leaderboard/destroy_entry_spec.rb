require 'rails_helper'

describe Leaderboard::DestroyEntry do
  let(:redis)       { Redis.current }
  let(:entry)       { build(:entry, id: 10) }

  describe '#decrement_score' do
    it 'will decrement score for entry' do
      Leaderboard::Actions.setup_entry_details(entry)
      Leaderboard::Actions.destroy_entry(entry.id)

      expect(redis.zrevrangebyscore('leaderboard', '+inf', '0',
                                    with_scores: true, limit: [ 0, 1 ]).size).to be(0)
    end
  end
end
