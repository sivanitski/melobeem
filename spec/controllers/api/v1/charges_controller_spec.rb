require 'rails_helper'
require 'stripe_mock'

RSpec.describe API::V1::ChargesController do
  let(:competition) { create :competition }
  let(:user) { create :user }
  let(:entry) { create :entry, user: user }
  let(:stripe_helper) { StripeMock.create_test_helper }

  before { StripeMock.start }

  after { StripeMock.stop }

  describe 'POST #create' do
    before do
      sign_in user
      post :create, params: { entry_id: entry.id, vote_value: '10' }, format: :json
    end

    it 'returns status :ok' do
      expect(response.status).to eq 200
    end

    it 'returns json with a client secret key' do
      expect(JSON.parse(response.body)).to have_key('client_secret')
      expect(JSON.parse(response.body)['client_secret']).to start_with('pi_')
    end
  end
end
