require 'rails_helper'

describe Leaderboard::GetCollection do
  let(:redis)        { Redis.current }
  let(:user)         { create(:user) }
  let(:competition)  { create(:competition) }

  describe '#get_collection' do
    it 'will return collection' do
      create(:entry, competition: competition, user: user)

      expect(redis.zrevrangebyscore('leaderboard', '+inf', '0',
                                    with_scores: true, limit: [ 0, 40 ]).size).to be(1)
    end
  end
end
