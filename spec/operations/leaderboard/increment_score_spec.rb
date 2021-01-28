require 'rails_helper'

describe Leaderboard::IncrementScore do
  let(:redis)       { Redis.current }
  let(:entry)       { build(:entry, id: 10) }

  describe '#increment_score' do
    it 'will setup score for entry' do
      Leaderboard::Actions.increment_score(2, entry.id)

      expect(redis.zscore('leaderboard', "entry:#{entry.id}").to_i).to be(2)
    end
  end
end
