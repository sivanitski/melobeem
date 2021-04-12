require 'rails_helper'

describe Votes::Create do
  let(:user) { create(:user) }
  let(:competition) { create(:competition) }
  let(:entry) { create(:entry, competition: competition, user: user) }
  let!(:vote) { create(:vote, entry: entry, user: user) }

  context 'when result success' do
    let(:result) do
      described_class.new.call(params: { value: vote.value, entry_id: entry.id, user_id: user.id,
                                         fingerprint: { 'ip' => '127.0.0.1', 'cookie' => '6e6aac3337a4c69bae3cc685dd791e212c76e346ae67e8559859fdf3b6fcaf5d' } })
    end

    it '.call should create a new vote' do
      expect { result.value }.to change(Vote, :count).by(1)
    end

    it 'succeed' do
      expect(result).to be_a Success
    end

    it 'changes entry total_votes by vote.value' do
      expect { result }.to change(entry, :total_votes).by(vote.value)
    end

    context 'when user has prize time' do
      let!(:prize_time) { create :prize_time, entry: entry }

      before { result }

      it 'changes time between voting from TIME_BETWEEN_VOTING to prize time' do
        expect(result).to be_a Success
        expect(result.value[:ttl_in_seconds]).to eq(prize_time.value.to_i * 60)
      end
    end
  end

  context 'when result fail' do
    let(:result) do
      described_class.new.call(params: { value: vote.value, entry_id: entry.id, user_id: nil,
                                         fingerprint: { 'ip' => '127.0.0.1', 'cookie' => '6e6aac3337a4c69bae3cc685dd791e212c76e346ae67e8559859fdf3b6fcaf5d' } })
    end

    it '.call should not create a new vote' do
      expect do
        result.error
      end.not_to change(Vote, :count)
    end

    it 'failed' do
      expect(result).to be_a Failure
    end

    it 'not changes entry total_votes' do
      expect { result }.not_to change(entry, :total_votes)
    end
  end

  context 'when tries to create votes one by one' do
    subject do
      described_class.new.call(params: { value: vote.value, entry_id: entry.id, user_id: user.id,
                                         fingerprint: { 'ip' => '127.0.0.1', 'cookie' => '6e6aac3337a4c69bae3cc685dd791e212c76e346ae67e8559859fdf3b6fcaf5d' } })
    end

    it 'creates only one vote' do
      expect { 3.times { subject } }.to change(Vote, :count).by(1)
    end
  end
end
