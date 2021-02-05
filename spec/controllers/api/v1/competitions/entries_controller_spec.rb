require 'rails_helper'

RSpec.shared_examples 'success status and correct schema' do
  it { expect(response.status).to eq 200 }

  it { expect(response).to match_response_schema('entries/show') }
end

RSpec.describe API::V1::Competitions::EntriesController do
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, competition: competition, user: user, gender: 'male') }

  describe 'GET /index' do
    before do
      create(:entry, competition: competition, user: user)

      get :index, params: { competition_id: competition.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(JSON.parse(response.body)['meta']['total_count']).to eq 1 }

    it { expect(response).to match_response_schema('entries/index') }
  end

  describe 'POST /create' do
    before do
      sign_in(user)

      post :create, params: { competition_id: competition.id, entry: attributes_for(:entry) }, format: :json
    end

    include_examples 'success status and correct schema'

    it { expect(Entry.count).to be 1 }
  end

  describe 'GET /show' do
    before do
      get :show, params: { competition_id: competition.id, id: entry.id }, format: :json
    end

    include_examples 'success status and correct schema'

    it { expect(JSON.parse(response.body)['entry']['id']).to eq entry.id }
  end
end
