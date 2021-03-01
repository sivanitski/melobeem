require 'rails_helper'

RSpec.describe API::V1::Users::EntriesController do
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, competition: competition, user: user, gender: 'male') }

  before { sign_in(user) }

  describe 'GET /edit' do
    before do
      get :edit, params: { id: entry.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/show') }

    it { expect(JSON.parse(response.body)['entry']['gender']).to eq 'male' }
  end

  describe 'PATCH /update' do
    before do
      patch :update, params: { id: entry.id, entry: attributes_for(:entry, gender: 'female') }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/show') }

    it { expect(JSON.parse(response.body)['entry']['gender']).to eq 'female' }
  end

  describe 'DELETE /destroy' do
    before do
      delete :destroy, params: { id: entry.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/show') }

    it { expect(Entry.count).to be 0 }
  end
end
