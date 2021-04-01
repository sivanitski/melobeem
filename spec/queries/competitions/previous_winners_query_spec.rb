require 'rails_helper'

RSpec.describe Competitions::PreviousWinnersQuery do
  let!(:first_competition) { create :competition, starts_at: Time.zone.today - 3.days }
  let!(:last_competition) { create :competition, starts_at: Time.zone.today - 2.days }
  let!(:current_competition) { create :competition, starts_at: Time.zone.today - 1.day }
  let!(:entry1) { create :entry, competition: current_competition, total_votes: 10 }
  let!(:entry2) { create :entry, competition: first_competition, total_votes: 3 }
  let!(:entry3) { create :entry, competition: first_competition, total_votes: 1 }
  let!(:entry4) { create :entry, competition: last_competition, total_votes: 3 }
  let!(:entry5) { create :entry, competition: last_competition, total_votes: 1 }

  describe '#call' do
    subject { described_class.new.call }

    it 'returns winners from the given competitions' do
      expect(subject).to match([entry4, entry2])
      expect(subject).not_to include(entry1, entry3, entry5)
    end
  end
end
