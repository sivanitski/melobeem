require 'rails_helper'

RSpec.describe Notifications::Buy do
  let(:entry) { create :entry }
  let(:vote) { create :vote, value: 50, entry: entry }

  describe '#call' do
    subject { described_class.new(vote).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains vote value in text field' do
      subject
      expect(Notification.first.text).to include(vote.value.to_s)
    end

    it 'notification belongs to the user who made purchase' do
      subject
      expect(Notification.first.user).to eq(vote.user)
    end
  end
end
