require 'rails_helper'

RSpec.describe Users::TakePrizeAndSendNotification do
  let(:user) { create :user }
  let(:entry) { create :entry, user: user, competition_additional_prize: 10 }

  describe '#call' do
    subject { described_class.new.call(prize: entry.competition_additional_prize, entry: entry) }

    it 'changes notifications count' do
      expect do
        subject
      end.to change(user.notifications, :count).from(0).to(1)
    end

    it 'increments premium spins value of user' do
      expect do
        subject
      end.to change(user, :premium_spins).by(10)
    end

    it 'changes entry field spent_competition_additional_prize' do
      expect do
        subject
      end.to change(entry, :spent_competition_additional_prize).from(false).to(true)
    end
  end
end
