require 'rails_helper'
require 'stripe_mock'

describe 'Webhooks API', type: :request do
  let(:stripe_helper) { StripeMock.create_test_helper }
  let(:params) do
    {
      data: {
        object: {
          id: 'pi_00000000000000',
          amount: 5000,
          amount_received: 5000
        }
      },
      type: 'payment_intent.succeeded'
    }
  end
  let(:entry) { create(:entry, competition: competition, user: user) }
  let(:user) { create(:user) }
  let(:competition) { create(:competition) }

  after { StripeMock.stop }

  before { StripeMock.start }

  describe '#check_payment_status' do
    before do
      allow(ENV).to receive(:fetch).with('STRIPE_ENDPOINT_SECRET', any_args).and_return('kek')
      stripe_signature = generate_stripe_signature(params.to_json)
      headers = { 'Stripe-Signature' => stripe_signature }
      post '/api/v1/check_payment_status', params: params.to_json, headers: headers
    end

    context 'when transaction was not found' do
      it 'returns 404 status' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns message about missing transaction' do
        expect(JSON.parse(response.body)['message']).to eq('Could not find PurchaseTransaction')
      end
    end

    context 'when transaction was found' do
      context 'when votes were enrolled' do
        subject do
          PurchaseTransaction.create!(intent_id: 'pi_00000000000000',
                                      amount: 5000,
                                      amount_received: 0,
                                      status: :process,
                                      vote_value: 50,
                                      user_id: user.id,
                                      entry_id: entry.id)
        end

        before do
          subject
          stripe_signature = generate_stripe_signature(params.to_json)
          headers = { 'Stripe-Signature' => stripe_signature }
          post '/api/v1/check_payment_status', params: params.to_json, headers: headers
        end

        it 'returns 201 status' do
          expect(response).to have_http_status(:created)
        end

        it 'changes amount_received value in transaction from zero to amount value' do
          subject.reload
          expect(subject.amount).to eq(subject.amount_received)
        end

        it 'create new vote' do
          expect do
            stripe_signature = generate_stripe_signature(params.to_json)
            headers = { 'Stripe-Signature' => stripe_signature }
            post '/api/v1/check_payment_status', params: params.to_json, headers: headers
          end.to change(Vote, :count).by(1)
        end

        it 'enrolls vote with value from transaction vote_value' do
          expect(entry.votes.first.value).to eq(subject.vote_value)
        end
      end
    end
  end
end
