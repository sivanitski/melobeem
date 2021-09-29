require 'rails_helper'

RSpec.describe Competitions::RewardWithAdditionalPrizes do
  subject { described_class.new(competition).call }

  let(:competition) { create :competition }
  let(:user) { create :user }
  let(:user1) { create :user }
  let!(:entry) { create :entry, competition: competition, user: user, final_rank: 1 }

  it 'rewards entries with competition additional prize' do
    subject
    expect(entry.awards.count).to eq(1)
  end
end
