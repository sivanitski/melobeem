require 'rails_helper'

RSpec.describe Notifications::Vote do
  let(:vote) { create :vote }

  describe '#call' do
    subject { described_class.new(vote).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'belongs to voted entry' do
      subject
      expect(Notification.first.entry).to eq vote.entry
    end

    it 'notification belongs to the user who voted' do
      subject
      expect(Notification.first.user).to eq(vote.user)
    end
  end
end
