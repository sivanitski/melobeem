require 'rails_helper'
require 'stripe_mock'

describe API::V1::WebhooksController, type: :controller do
  let(:stripe_helper) { StripeMock.create_test_helper }
  let(:params) do
    {
      "data": {
        "object": {
          "id": 'pi_00000000000000',
          "amount": 5000,
          "amount_received": 5000
        }
      },
      "type": 'payment_intent.succeeded'
    }
  end
  let(:entry) { create(:entry, competition: competition, user: user) }
  let(:user) { create(:user) }
  let(:competition) { create(:competition) }

  after { StripeMock.stop }

  before { StripeMock.start }

  describe '#check_payment_status' do
    before do
      request.headers['Stripe-Signature'] = generate_stripe_signature(params.to_json)
    end

    context 'when transaction was not found' do
      before { post :check_payment_status, body: params.to_json }

      it 'returns 400 status' do
        expect(response).to have_http_status(:bad_request)
      end

      it 'returns message about missing transaction' do
        expect(JSON.parse(response.body)['message']).to eq('Cannot find transaction')
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
          post :check_payment_status, body: params.to_json
        end

        it 'returns 200 status' do
          expect(response).to have_http_status(:ok)
        end

        it 'returns payment completion message' do
          expect(JSON.parse(response.body)['message']).to eq('Votes were enrolled successfully')
        end

        it 'changes amount_received value in transaction from zero to amount value' do
          subject.reload
          expect(subject.amount).to eq(subject.amount_received)
        end

        it 'enrolls votes from transaction vote_value' do
          expect(entry.votes.first.value).to eq(subject.vote_value)
        end
      end
    end
  end
end
