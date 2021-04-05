require 'rails_helper'

RSpec.describe Notifications::BuySpins do
  let(:transaction) { create :purchase_transaction }

  describe '#call' do
    subject { described_class.new(transaction).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains spins count in payload' do
      subject
      expect(Notification.first.payload['spins_count']).to eq(transaction.value)
    end

    it 'belongs to transaction entry' do
      subject
      expect(Notification.first.entry).to eq transaction.entry
    end

    it 'notification belongs to the user who made purchase' do
      subject
      expect(Notification.first.user).to eq(transaction.user)
    end
  end
end
