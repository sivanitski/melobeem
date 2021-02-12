require 'rails_helper'

RSpec.shared_examples 'success status and correct schema' do
  it { expect(response.status).to eq 200 }

  it { expect(response).to match_response_schema('entries/show') }
end

RSpec.describe API::V1::EntriesController do
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

  describe 'GET /latest_voters' do
    let(:ids) { JSON.parse(response.body)['users'].each_with_object([]) { |user, arr| arr << user['id'] } }

    context 'when voters are present' do
      let(:voters) { create_list :user, 2 }
      let(:entrant) { create :entry, user: user, competition: competition }

      before do
        create_list :vote, 1, entry: entrant, user: voters.first
        create_list :vote, 2, entry: entrant, user: voters.second
        get :latest_voters, params: { competition_id: competition.id, id: entrant.id }, format: :json
      end

      it 'returns unique voters ids' do
        expect(ids.uniq).to eq ids
      end

      it 'ID of users of the most recent votes are equal ID of users from the action response' do
        expect(ids).to eq(voters.reverse.pluck(:id))
      end

      it 'ID of user who did not vote for the given entry not in users list' do
        expect(ids).not_to include(user.id)
      end

      it { expect(response).to match_response_schema('entries/latest_voters') }
    end

    context 'when voters are absent' do
      before { get :latest_voters, params: { competition_id: competition.id, id: entry.id }, format: :json }

      it 'returns 404 status' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns No voted message' do
        expect(JSON.parse(response.body)['message']).to eq 'No voted'
      end
    end
  end
end
