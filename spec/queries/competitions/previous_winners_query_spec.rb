require 'rails_helper'

RSpec.describe Competitions::PreviousWinnersQuery do
  let(:competition) { create(:competition, starts_at: Time.zone.today) }
  let(:another_competition) { create(:competition, starts_at: Time.zone.yesterday) }
  let!(:entry1) { create(:entry, competition: competition, total_votes: 3) }
  let!(:entry2) { create(:entry, competition: competition, total_votes: 1) }
  let!(:entry3) { create(:entry, competition: another_competition, total_votes: 3) }
  let!(:entry4) { create(:entry, competition: another_competition, total_votes: 1) }

  describe '#call' do
    subject { described_class.new.call }

    it 'returns winners from the given competitions sorted starts_at by descending' do
      expect(subject).to match([entry1, entry3])
      expect(subject).not_to include(entry2, entry4)
    end
  end
end
