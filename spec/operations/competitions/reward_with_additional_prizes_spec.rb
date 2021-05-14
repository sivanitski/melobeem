require 'rails_helper'

RSpec.describe Competitions::RewardWithAdditionalPrizes do
  subject { described_class.new(competition).call }

  let(:competition) { create :competition }
  let(:user) { create :user }
  let(:user1) { create :user }
  let!(:entry) { create :entry, competition: competition, user: user, final_rank: 1 }
  let!(:entry1) { create :entry, competition: competition, user: user1, final_rank: 40 }

  it 'rewards entries with competition additional prize' do # rubocop:disable RSpec/ExampleLength
    expect do
      subject
      entry.reload
      entry1.reload
    end.to change(entry.reload, :competition_additional_prize).from(0).to(10)
                                                              .and change(entry1.reload, :competition_additional_prize).from(0).to(2)
  end
end
