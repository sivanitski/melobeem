require 'rails_helper'

RSpec.describe Notifications::CompleteLevel do
  let(:prize) { create :prize }

  describe '#call' do
    subject { described_class.new(entry: prize.entry, prize: prize, level: prize.level).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains prize level in payload' do
      subject
      expect(Notification.first.payload['level']).to eq(prize.level)
    end

    it 'notification contains prize in payload' do
      subject
      expect(Notification.first.payload['prize']).in?(PRIZES)
    end

    it 'belongs to entry' do
      subject
      expect(Notification.first.entry).to eq prize.entry
    end

    it 'notification belongs to the user who made purchase' do
      subject
      expect(Notification.first.user).to eq(prize.entry.user)
    end
  end
end
