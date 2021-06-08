require 'rails_helper'

RSpec.describe Vote, type: :model do
  it { is_expected.to belong_to :entry }
  it { is_expected.to belong_to :user }

  it do
    expect(subject).to define_enum_for(:source_type).with_values(user: 'user', spinner: 'spinner',
                                                                 bonus: 'bonus', invitation: 'invitation',
                                                                 shop: 'shop')
                                                    .backed_by_column_of_type(:enum)
  end

  it { is_expected.to allow_values(:user, :spinner, :bonus, :invitation, :shop).for(:source_type) }
  it { is_expected.to validate_presence_of(:value) }

  describe '#apply!' do
    let(:entry) { create :entry }
    let(:vote) { create(:vote, entry: entry, value: 22_000) }

    it 'updates total votes for associated entry' do
      expect { vote.apply! }.to change(entry, :total_votes).from(0).to(vote.value)
    end

    it 'updates calculated entry level' do
      expect { vote.apply! }.to change(entry, :level).from(1).to(49)
    end

    context 'when checks that creates level prize and sends notification about complete level' do
      it 'changes prizes count' do
        expect { vote.apply! }.to change(Prize, :count).from(0).to(47)
      end

      it 'changes notifications count' do
        expect { vote.apply! }.to change(Notification, :count).from(0).to(47)
      end
    end
  end
end
