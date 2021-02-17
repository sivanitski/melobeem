require 'rails_helper'

RSpec.describe Vote, type: :model do
  it { is_expected.to belong_to :entry }
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:value) }

  describe '#apply!' do
    let(:entry) { create(:entry) }
    let(:vote) { create(:vote, entry: entry, value: rand(1..50)) }

    it 'updates total votes for associated entry' do
      expect { vote.apply! }.to change(entry, :total_votes).from(0).to(vote.value)
    end
  end
end
