require 'rails_helper'

RSpec.describe Entries::WithRankQuery do
  let(:competition) { create(:competition) }
  let!(:entry1) { create(:entry, competition: competition, total_votes: 3) }
  let!(:entry2) { create(:entry, competition: competition, total_votes: 1) }
  let!(:entry3) { create(:entry, competition: competition, total_votes: 3) }
  let!(:entry_from_different_competition) { create(:entry, total_votes: 2) }

  describe '#call' do
    subject { described_class.new.call(competition.id) }

    it 'returns ranked entries from the given competition ordered consistently by rank' do
      entry1.update(updated_at: 1.minute.from_now) # touch updated_at to mess with default postgres ordering
      expect(subject).to match([entry1, entry3, entry2])
      expect(subject).not_to include(entry_from_different_competition)
    end

    it 'adds rank attribute to the entries' do
      expect(subject).to all(respond_to(:rank))
      expect(subject.map(&:rank)).to eq [1, 1, 3]
    end

    it 'adds previous_id attribute to the entries' do
      expect(subject).to all(respond_to(:previous_id))
      expect(subject.map(&:previous_id)).to eq [nil, entry1.id, entry3.id]
    end

    it 'adds next_id attribute to the entries' do
      expect(subject).to all(respond_to(:next_id))
      expect(subject.map(&:next_id)).to eq [entry3.id, entry2.id, nil]
    end
  end
end
