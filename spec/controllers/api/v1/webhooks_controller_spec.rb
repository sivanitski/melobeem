require 'rails_helper'
require 'stripe_mock'

RSpec.describe API::V1::WebhooksController, type: :request do
  include StripeHelper

  let(:stripe_helper) { StripeMock.create_test_helper }
  let(:product_spinner) { create :product_spinner }
  let(:product_votes) { create :product_votes }
  let(:params) do
    {
      data: {
        object: {
          id: 'pi_00000000000000',
          amount: 1000,
          amount_received: 1000
        }
      },
      type: 'payment_intent.succeeded'
    }
  end
  let!(:entry) { create(:entry) }

  before { StripeMock.start }

  after { StripeMock.stop }

  describe '#check_votes_payment' do
    before do
      allow(ENV).to receive(:fetch).with('STRIPE_ENDPOINT_SECRET', any_args).and_return('stripe_endpoint_secret')
      stripe_signature = generate_stripe_signature(params.to_json)
      headers = { 'Stripe-Signature' => stripe_signature }
      post '/api/v1/check_votes_payment', params: params.to_json, headers: headers
    end

    context 'when transaction was not found' do
      it_behaves_like 'Webhook failed'
    end

    context 'when transaction was found' do
      context 'when vote.value were enrolled' do
        let!(:transaction) { create :purchase_transaction, entry: entry, product_type: :vote, product: product_votes }

        before do
          stripe_signature = generate_stripe_signature(params.to_json)
          headers = { 'Stripe-Signature' => stripe_signature }
          post '/api/v1/check_votes_payment', params: params.to_json, headers: headers
        end

        it_behaves_like 'Webhook succeed'

        it 'create new vote' do
          expect do
            stripe_signature = generate_stripe_signature(params.to_json)
            headers = { 'Stripe-Signature' => stripe_signature }
            post '/api/v1/check_votes_payment', params: params.to_json, headers: headers
          end.to change(Vote, :count).by(1)
        end

        it 'create new vote with shop source type' do
          stripe_signature = generate_stripe_signature(params.to_json)
          headers = { 'Stripe-Signature' => stripe_signature }
          post '/api/v1/check_votes_payment', params: params.to_json, headers: headers

          expect(Vote.first.source_type).to eq('shop')
        end

        it 'enrolls vote with value from transaction value' do
          expect(transaction.value).to eq(entry.votes.first.value)
        end

        it 'increases the entry total_votes by the value of the vote' do
          expect(entry.reload.total_votes).to eq entry.votes.first.value
        end
      end

      context 'when votes where bought' do
        let!(:transaction) { create :purchase_transaction, entry: entry, product: product_votes }

        it 'increments revenue of current competition' do
          expect do
            stripe_signature = generate_stripe_signature(params.to_json)
            headers = { 'Stripe-Signature' => stripe_signature }
            post '/api/v1/check_votes_payment', params: params.to_json, headers: headers
          end.to change(Competition.current!, :revenue).by(transaction.amount_received)
        end
      end
    end
  end

  describe 'post #check_spins_payment' do
    before do
      allow(ENV).to receive(:fetch).with('STRIPE_ENDPOINT_SECRET_SPIN', any_args).and_return('stripe_endpoint_secret')
      stripe_signature = generate_stripe_spin_signature(params.to_json)
      headers = { 'Stripe-Signature' => stripe_signature }
      post '/api/v1/check_spins_payment', params: params.to_json, headers: headers
    end

    context 'when transaction was not found' do
      it_behaves_like 'Webhook failed'
    end

    context 'when transaction was found' do
      context 'when vote.value were enrolled' do
        let!(:transaction) { create :purchase_transaction, product_type: :spin, product: product_spinner }

        before do
          transaction.user.update!(premium_spins: 5)
          stripe_signature = generate_stripe_spin_signature(params.to_json)
          headers = { 'Stripe-Signature' => stripe_signature }
          post '/api/v1/check_spins_payment', params: params.to_json, headers: headers
        end

        it_behaves_like 'Webhook succeed'

        it 'enrolls premium_spins with value from transaction value' do
          expect(transaction.value + transaction.user.premium_spins).to eq transaction.user.reload.premium_spins
        end
      end

      context 'when spins where bought' do
        let!(:transaction) { create :purchase_transaction, entry: entry, product: product_spinner }

        it 'increments revenue of current competition' do
          expect do
            stripe_signature = generate_stripe_spin_signature(params.to_json)
            headers = { 'Stripe-Signature' => stripe_signature }
            post '/api/v1/check_spins_payment', params: params.to_json, headers: headers
          end.to change(Competition.current!, :revenue).by(transaction.amount_received)
        end
      end
    end
  end
end
