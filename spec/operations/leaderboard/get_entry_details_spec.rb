require 'rails_helper'

describe Leaderboard::GetEntryDetails do
  let(:redis)        { Redis.current }
  let(:user)         { create(:user) }
  let(:competition)  { create(:competition) }
  let!(:entry)       { create(:entry, competition: competition, user: user) }

  describe '#get_entry_details' do
    it 'will return collection' do
      details = Leaderboard::Actions.get_entry_details(entry.id)

      expect(details['id']).to eq(entry.id.to_s)
    end
  end
end
