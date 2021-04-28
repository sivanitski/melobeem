require 'rails_helper'

RSpec.describe Friendships::WithCurrentBabyQuery do
  let(:user) { create(:user) }
  let(:friend1) { create(:user) }
  let(:friend2) { create(:user) }
  let(:competition) { create(:competition) }
  let!(:entry) { create(:entry, competition: competition, total_votes: 3, user: friend1) }

  describe '#call' do
    subject { described_class.new }

    before do
      create(:friendship, user: user, friend: friend1)
      create(:friendship, user: user, friend: friend2, source_type: 'external')
    end

    it 'returns user with current baby name' do
      result = subject.call(user.internal_friends)

      expect(result.first.current_baby_name).to eq(entry.name)
    end

    it 'returns user without current baby name' do
      result = subject.call(user.external_friends)

      expect(result.first.current_baby_name).to be_nil
    end

    it 'returns friends with and without baby name' do
      result = subject.call(user.friends)

      expect(result.map(&:current_baby_name)).to match([entry.name, nil])
    end
  end
end
