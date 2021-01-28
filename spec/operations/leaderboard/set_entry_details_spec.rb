require 'rails_helper'

describe Leaderboard::SetEntryDetails do
  let(:redis)       { Redis.current }
  let(:entry)       { build(:entry) }

  describe '#setup_entry_details' do
    it 'will setup entry details for leaderboard' do
      Leaderboard::Actions.setup_entry_details(entry)

      expect(redis.hgetall("entry:#{entry.id}")).not_to eq({})
    end
  end
end
