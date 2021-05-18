require 'rails_helper'

RSpec.describe Notifications::PrizeForCompetition do
  let!(:entry) { create :entry, competition_additional_prize: 8 }

  describe '#call' do
    subject { described_class.new(prize: entry.competition_additional_prize, entry: entry).call }

    it 'creates new notification' do
      expect { subject }.to change(Notification, :count).from(0).to(1)
    end

    it 'belongs to entry' do
      subject
      expect(Notification.first.entry).to eq entry
    end

    it 'notification belongs to entry user' do
      subject
      expect(Notification.first.user).to eq(entry.user)
    end

    it 'notification contains prize in payload' do
      subject
      expect(Notification.first.payload['prize']).to eq entry.competition_additional_prize
    end

    it 'notification contains competition title in payload' do
      subject
      expect(Notification.first.payload['competition']).to eq entry.competition.title
    end
  end
end
