require 'rails_helper'

RSpec.describe Friendship, type: :model do
  let(:user) { create :user }
  let(:friend) { create :user }

  it { is_expected.to belong_to(:friend).class_name('User') }
  it { is_expected.to belong_to :user }

  context 'when friendship is already exist' do
    it 'returns validation error' do
      create(:friendship, user: user, friend: friend)
      expect { create(:friendship, user: user, friend: friend) }
        .to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: User and you are already friends')
    end
  end

  context 'when trying to create a friendship with himself' do
    it 'returns validation error' do
      expect { create(:friendship, user: user, friend: user) }
        .to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: User cannot be friends with himself')
    end
  end
end
