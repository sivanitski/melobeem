shared_examples_for 'Buy operation' do
  context 'when creates Stripe::PaymentIntent object' do
    let(:entry) { create :entry }
    let(:stripe_helper) { StripeMock.create_test_helper }

    before { StripeMock.start }

    after { StripeMock.stop }

    it 'returns json with a client_secret key and id' do
      expect(JSON.parse(result)).to have_key('client_secret')
      expect(JSON.parse(result)).to have_key('id')
    end

    it 'creates a new transaction' do
      expect { result }.to change(PurchaseTransaction, :count).by(1)
    end
  end
end
