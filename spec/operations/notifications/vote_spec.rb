require 'rails_helper'

RSpec.describe Notifications::Vote do
  let(:entry) { create :entry }
  let(:vote) { create :vote, entry: entry }

  describe '#call' do
    subject { described_class.new(vote).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'notification contains entry name in text field' do
      subject
      expect(Notification.first.text).to include(entry.name)
    end

    it 'notification belongs to the user who voted' do
      subject
      expect(Notification.first.user).to eq(vote.user)
    end
  end
end
