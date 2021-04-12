require 'rails_helper'

describe Prizes::Take do
  describe '#call' do
    subject { described_class.new(prize).call }

    context 'when prize source type == votes' do
      let!(:prize) { create :prize, source_type: 'vote', value: 10 }

      it 'creates new vote' do
        expect { subject }.to change(Vote, :count).by(1)
      end

      it 'enrolls number of votes from prize to entry' do
        expect { subject }.to change(prize.entry, :total_votes).from(0).to(10)
      end

      it 'changes entry level' do
        expect { subject }.to change(prize.entry, :level).from(1).to(4)
      end

      it 'updates prize spent status' do
        expect { subject }.to change(prize, :spent).from(false).to(true)
      end
    end

    context 'when prize source type == spins' do
      let(:prize) { create :prize, source_type: 'spin', value: 10 }

      before { prize.entry.user.update!(premium_spins: 2) }

      it 'enrolls number of spins from prize to entry user' do
        expect { subject }.to change(prize.entry.user, :premium_spins).from(2).to(12)
      end

      it 'updates prize spent status' do
        expect { subject }.to change(prize, :spent).from(false).to(true)
      end
    end

    context 'when prize source == prize time' do
      let(:prize) { create :prize, source_type: 'min', value: 10 }

      context 'when there are no other expiring prize times' do
        it 'creates new prize time' do
          expect { subject }.to change(PrizeTime, :count).by(1)
        end

        it 'updates prize spent status' do
          expect { subject }.to change(prize, :spent).from(false).to(true)
        end

        context 'when exists uniq free vote redis key' do
          let(:uniq_key) { [prize.entry.user.id, prize.entry.id].join(':') }

          before { Redis.current.setex(uniq_key, 600, uniq_key) }

          it 'checks that uniq redis key exists' do
            expect(Redis.current.exists?(uniq_key)).to eq true
          end

          it 'deletes uniq free vote redis key' do
            subject
            expect(Redis.current.exists?(uniq_key)).to eq false
          end
        end
      end

      context 'when there is another one expiring prize time belongs to this entry' do
        before { create :prize_time, entry: prize.entry }

        it 'does not create new prize time' do
          expect { subject }.not_to change(PrizeTime, :count)
        end

        it 'updates prize spent status' do
          expect { subject }.not_to change(prize, :spent)
        end
      end
    end
  end
end
