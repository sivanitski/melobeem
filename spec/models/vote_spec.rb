require 'rails_helper'

RSpec.describe Vote, type: :model do
  it { is_expected.to belong_to :entry }
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:value) }

  describe 'callbacks' do
    let(:redis)         { Redis.current }
    let(:user)          { create(:user) }
    let(:competition)   { create(:competition) }
    let(:entry)         { create(:entry, competition: competition, user: user) }
    let!(:vote2)        { create(:vote, user: user, entry: entry, value: 5) }

    before do
      create(:vote, user: user, entry: entry, value: 10)
    end

    describe '#increase_leaderboard_score' do
      it 'increase votes count on leaderboard' do
        expect(redis.zscore('leaderboard', "entry:#{entry.id}").to_i).to be(15)
      end
    end

    describe '#reduce_leaderboard_score' do
      it 'reduce votes count on leaderboard' do
        vote2.destroy

        expect(redis.zscore('leaderboard', "entry:#{entry.id}").to_i).to be(10)
      end
    end
  end
end
