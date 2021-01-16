require 'rails_helper'

describe CreateVote do
  let(:user) { create(:user) }
  let(:competition) { create(:competition) }
  let(:entry) { create(:entry, competition: competition, user: user) }
  let(:vote) { create(:vote, entry: entry, user: user) }

  context 'when result success' do
    let(:result) { described_class.call(params: { value: vote.value, entry_id: entry.id, user_id: user.id }) }

    it '.call should create order new vote' do
      expect(result.vote).to eq(Vote.last)
    end

    it 'succeed' do
      expect(result).to be_a_success
    end
  end
end
