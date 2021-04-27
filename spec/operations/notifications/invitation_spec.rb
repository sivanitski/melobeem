require 'rails_helper'

RSpec.describe Notifications::Invitation do
  let(:vote) { create :vote }
  let(:referrer) { create :user }

  describe '#call' do
    subject { described_class.new(vote: vote, referrer: referrer).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'belongs to voted entry' do
      subject
      expect(Notification.first.entry).to eq vote.entry
    end

    it 'notification belongs to the user who invite friend' do
      subject
      expect(Notification.first.user).to eq(vote.user)
    end
  end
end
