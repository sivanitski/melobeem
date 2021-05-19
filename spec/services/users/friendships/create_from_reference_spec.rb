require 'rails_helper'

RSpec.describe Users::Friendships::CreateFromReference do
  let(:user) { create(:user) }

  describe '#call' do
    context 'when failure' do
      subject { described_class }

      context 'when friend is current user' do
        it 'return failure' do
          expect { subject.new(user: user, referrer: user).call }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end

    context 'when referrer present' do
      subject { described_class.new(referrer: referrer, user: user) }

      let(:referrer) { create(:user) }

      it 'create friendships' do
        expect { subject.call }.to change(Friendship, :count).by(2)
      end

      context 'when user already is friend' do
        it 'will add friend' do
          user.friends << referrer

          expect { subject.call }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end
  end
end
