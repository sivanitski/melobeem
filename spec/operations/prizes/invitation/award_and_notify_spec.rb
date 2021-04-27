require 'rails_helper'

describe Prizes::Invitation::AwardAndNotify do
  subject { described_class.new(user: user, referrer: referrer, prize: 5).call }

  let(:user)     { create(:user) }
  let(:referrer) { create(:user) }

  describe '#call' do
    context 'when user have no current entry' do
      it 'return failure' do
        failure = Failure.new('User has no current entry')
        expect(subject).to eq(failure)
      end
    end

    context 'when user have current entry' do
      before { create(:entry, user: user) }

      context 'when it was first invite' do
        it 'create vote' do
          expect { subject }.to change(Vote, :count).by(1)
        end

        it 'create notification' do
          # level notification also created
          expect { subject }.to change(Notification, :count).by(2)
        end

        it 'add 5 votes into entry' do
          subject

          expect(user.entries.first.reload.total_votes).to eq(5)
        end
      end
    end
  end
end
