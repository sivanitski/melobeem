require 'rails_helper'

describe Spins::Create do
  let!(:competition) { create :competition }
  let!(:user) { create :user }
  let!(:entry) { create :entry, user: user, competition: competition }

  describe '#call' do
    subject { described_class.new(user).call }

    context 'when result success' do
      it 'creates new vote' do
        expect { subject.value }.to change(Vote, :count).by(1)
      end

      it 'creates new spin' do
        expect { subject.value }.to change(Spin, :count).by(1)
      end

      it 'changes entry total_votes by spin.value' do
        subject
        expect { entry.reload }.to change(entry, :total_votes).by(Spin.first.value)
      end

      it 'succeed' do
        expect(subject).to be_a Success
      end

      context 'when user has two premium spins' do
        subject { 5.times { described_class.new(user).call } }

        before { user.update!(premium_spins: 2) }

        it 'creates only three votes' do
          expect { subject }.to change(Vote, :count).from(0).to(3)
        end

        it 'creates three spins (2 paid and 1 free' do
          expect { subject }.to change(Spin, :count).from(0).to(3)
          expect(Spin.where(paid: true).count).to eq(2)
          expect(Spin.where(paid: false).count).to eq(1)
        end

        it 'last spending spin is free' do
          subject
          expect(Spin.order(created_at: :asc).last.paid?).to eq false
        end
      end
    end

    context 'when result failure' do
      subject { 5.times { described_class.new(user).call } }

      it 'creates only one vote' do
        expect { subject }.to change(Vote, :count).by(1)
      end

      it 'creates only one spin' do
        expect { subject }.to change(Spin, :count).by(1)
      end
    end
  end
end
