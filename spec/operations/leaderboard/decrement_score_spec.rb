require 'rails_helper'

describe Leaderboard::DecrementScore do
  let(:redis)       { Redis.current }
  let(:entry)       { build(:entry, id: 10) }

  describe '#decrement_score' do
    it 'will decrement score for entry' do
      Leaderboard::Actions.increment_score(5, entry.id)
      Leaderboard::Actions.decrement_score(2, entry.id)

      expect(redis.zscore('leaderboard', "entry:#{entry.id}").to_i).to be(3)
    end
  end
end
