require 'rails_helper'

RSpec.describe Notifications::BuyVotes do
  let(:vote) { create :vote, value: 50 }

  describe '#call' do
    subject { described_class.new(vote).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains vote value in payload' do
      subject
      expect(Notification.first.payload['votes']).to eq(vote.value)
    end

    it 'belongs to voted entry' do
      subject
      expect(Notification.first.entry).to eq vote.entry
    end

    it 'notification belongs to the user who made purchase' do
      subject
      expect(Notification.first.user).to eq(vote.user)
    end
  end
end
