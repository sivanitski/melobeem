require 'rails_helper'

RSpec.describe Entry, type: :model do
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, user: user, competition: competition) }

  it { is_expected.to have_many(:votes).dependent(:destroy) }
  it { is_expected.to have_many(:purchase_transactions).dependent(:destroy) }
  it { is_expected.to belong_to :competition }
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:gender) }
  it { expect(entry).to validate_uniqueness_of(:user_id).scoped_to(:competition_id) }

  context 'when user create new entry on the same competition' do
    it 'return validation error' do
      create(:entry, user: user, competition: competition)
      expect { create(:entry, user: user, competition: competition) }
        .to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: User has already been taken')
    end
  end

  describe 'callbacks' do
    let(:redis) { Redis.current }
    let!(:entry) { create(:entry, user: user, competition: competition) }

    describe '#add_to_leaderboard' do
      it 'add entry to leaderboard' do
        expect(redis.zscore('leaderboard', "entry:#{entry.id}").to_i).to be(0)
      end

      it 'add entry details' do
        expect(Leaderboard::Actions.get_entry_details(entry.id)['id']).to eq(entry.id.to_s)
      end
    end

    describe '#remove_from_leaderboard' do
      it 'remove entry from leaderboard' do
        entry.destroy

        expect(redis.zscore('leaderboard', "entry:#{entry.id}")).to be_nil
      end
    end
  end
end
