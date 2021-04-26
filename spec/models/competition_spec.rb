require 'rails_helper'

RSpec.describe Competition, type: :model do
  it { is_expected.to have_many(:entries).dependent(:destroy) }
  it { is_expected.to have_many(:purchase_transactions).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:prize_cents) }
  it { is_expected.to validate_presence_of(:starts_at) }
  it { is_expected.to validate_presence_of(:ends_at) }

  describe '#increment_revenue!' do
    let(:competition) { create :competition, revenue: 500 }
    let(:purchase_transaction) { create :purchase_transaction, amount_received: 1500 }

    it 'increments revenue by purchase_transaction.amount_received value' do
      expect { competition.increment_revenue!(purchase_transaction) }.to change(competition, :revenue).from(500).to(2000)
    end
  end
end
