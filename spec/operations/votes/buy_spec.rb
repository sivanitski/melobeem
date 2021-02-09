require 'rails_helper'
require 'stripe_mock'

describe Votes::Buy do
  let(:user) { create(:user) }
  let(:competition) { create(:competition) }
  let(:entry) { create(:entry, competition: competition, user: user) }

  context 'when creates Stripe::PaymentIntent object' do
    let(:result) { described_class.new.call(params: { entry_id: entry.id, vote_value: '50' }, user: user) }
    let(:stripe_helper) { StripeMock.create_test_helper }

    before { StripeMock.start }

    after { StripeMock.stop }

    it 'returns json with a client_secret key' do
      expect(JSON.parse(result)).to have_key('client_secret')
    end

    it 'creates a new transaction' do
      expect { result }.to change(PurchaseTransaction, :count).by(1)
    end
  end
end
