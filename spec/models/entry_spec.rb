require 'rails_helper'

RSpec.describe Entry, type: :model do
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, total_votes: 30_001, user: user, competition: competition) }

  it { is_expected.to have_many(:votes).dependent(:destroy) }
  it { is_expected.to have_many(:purchase_transactions).dependent(:destroy) }
  it { is_expected.to have_many(:notifications).dependent(:destroy) }
  it { is_expected.to have_many(:prizes).dependent(:destroy) }
  it { is_expected.to have_many(:prize_times).dependent(:destroy) }
  it { is_expected.to belong_to :competition }
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:level) }
  it { expect(entry).to validate_uniqueness_of(:user_id).scoped_to(:competition_id) }

  context 'when user create new entry on the same competition' do
    it 'return validation error' do
      create(:entry, user: user, competition: competition)
      expect { create(:entry, user: user, competition: competition) }
        .to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: User has already been taken')
    end
  end

  describe '#update_level!' do
    context 'when updates level of entry' do
      before do
        entry.update!(total_votes: 5)
        entry.update_level!
      end

      it 'updates level of given entry' do
        expect(entry.level).to eq 3
      end
    end

    context 'when votes are out of level range' do
      before { entry.update_level! }

      it 'returns max level' do
        expect(entry.level).to eq LEVELS.keys.last
      end
    end

    it 'LEVELS_BY_VOTES constant values include all numbers from 0 to 30_000' do
      all_values = LEVELS.values.each_with_object([]) { |value, arr| arr << value.to_a }.flatten
      expect(all_values - (0..30_000).to_a).to eq []
    end

    it 'LEVELS_BY_VOTES constant keys include all numbers from 1 to 124' do
      all_keys = LEVELS.keys.each_with_object([]) { |key, arr| arr << key }
      expect(all_keys - (1..124).to_a).to eq []
    end

    context 'when checks that creates level prize and sends notification about complete level' do
      before { entry.update!(total_votes: 2) }

      it 'changes prizes count' do
        expect { entry.update_level! }.to change(Prize, :count).from(0).to(1)
      end

      it 'changes notifications count' do
        expect { entry.update_level! }.to change(Notification, :count).from(0).to(1)
      end
    end

    context 'when checks that does not create level prize and does not send notification if entry level does not change' do
      before do
        entry.update!(total_votes: 2)
        entry.update_level!
      end

      it 'not changes prizes count' do
        expect { entry.update_level! }.not_to change(Prize, :count)
      end

      it 'not changes notifications count' do
        expect { entry.update_level! }.not_to change(Notification, :count)
      end
    end

    context 'when checks that does not create level prize and does not send notification if entry level == 1' do
      before { entry.update!(total_votes: 1) }

      it 'not changes prizes count' do
        expect { entry.update_level! }.not_to change(Prize, :count)
      end

      it 'not changes notifications count' do
        expect { entry.update_level! }.not_to change(Notification, :count)
      end
    end
  end
end
