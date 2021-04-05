require 'rails_helper'

RSpec.describe Notifications::CompleteLevel do
  let(:entry) { create :entry }

  describe '#call' do
    subject { described_class.new(entry).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains entry level in payload' do
      subject
      expect(Notification.first.payload['level']).to eq(entry.level)
    end

    it 'notification contains prize in payload' do
      subject
      expect(Notification.first.payload['prize']).in?(described_class::PRIZES)
    end

    it 'belongs to entry' do
      subject
      expect(Notification.first.entry).to eq entry
    end

    it 'notification belongs to the user who made purchase' do
      subject
      expect(Notification.first.user).to eq(entry.user)
    end
  end
end
