require 'rails_helper'

RSpec.describe Users::Deactivate do
  let(:user) { create :user }
  let(:entry) { create :entry, user: user, total_votes: 500 }

  describe '#call' do
    subject { described_class.new(user).call }

    it 'changes attribute deactivated of user' do
      expect do
        subject
        user.reload
      end.to change(user, :deactivated).from(false).to true
    end

    it 'changes name, email, updated_at of user' do # rubocop:disable RSpec/ExampleLength
      expect do
        subject
        user.reload
      end.to change(user, :name)
        .and change(user, :email)
        .and change(user, :updated_at)
    end

    it 'changes attribute deactivated of user entry' do
      expect do
        subject
        entry.reload
      end.to change(entry, :deactivated).from(false).to true
    end

    it 'changes attribute updated_at of user entry' do
      expect do
        subject
        entry.reload
      end.to change(entry, :updated_at)
    end

    it 'nullifies total_votes of user entry' do
      expect do
        subject
        entry.reload
      end.to change(entry, :total_votes).from(500).to 0
    end
  end
end
