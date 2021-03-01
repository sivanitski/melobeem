require 'rails_helper'

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

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/show') }

    it { expect(Entry.count).to be 1 }
  end

  describe 'GET /show' do
    before do
      get :show, params: { competition_id: competition.id, id: entry.id }, format: :json
    end

    it { expect(response).to match_response_schema('entries/ranked') }

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

  describe 'GET /total_votes_by_date' do
    let(:total_votes) { JSON.parse(response.body)['total_votes'] }
    let(:entrant) { create :entry, user: user, competition: competition }

    context 'when votes are present' do
      let(:voters) { create_list :user, 2 }

      before do
        create_list :vote, 3, value: 1, entry: entrant, user: voters.first, created_at: Time.current - 1.day
        create_list :vote, 2, value: 1, entry: entrant, user: voters.second
      end

      it 'returns amount of votes for today' do
        get :total_votes_by_date, params: { id: entrant.id, date: Time.current.to_s }
        expect(total_votes).to eq(2)
      end

      it 'returns amount of votes for yesteday' do
        get :total_votes_by_date, params: { id: entrant.id, date: (Time.current - 1.day).to_s }
        expect(total_votes).to eq(3)
      end
    end

    context 'when voters are absent' do
      it 'returns amount of votes for today' do
        get :total_votes_by_date, params: { id: entrant.id }
        expect(total_votes).to eq(0)
      end
    end
  end

  describe 'GET /current' do
    let!(:entry) { create(:entry, competition: competition, user: user, gender: 'male') }

    before do
      sign_in user
      get :current, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/current') }

    it 'returns current entry ID within current competition' do
      expect(JSON.parse(response.body)['entry']['id']).to eq entry.id
    end
  end

  describe 'GET /search' do
    context 'when name was founded' do
      before do
        get :search, params: { id: entry.id, q: entry.name.downcase.split.first }, format: :json
      end

      it { expect(response.status).to eq 200 }

      it { expect(response).to match_response_schema('entries/search') }

      it 'returns entry name' do
        expect(JSON.parse(response.body)['entries'][0]['name']).to eq entry.name
      end
    end

    context 'when search request is empty' do
      before do
        get :search, params: { id: entry.id, q: nil }, format: :json
      end

      it { expect(response.status).to eq 200 }

      it 'returns an empty array' do
        expect(JSON.parse(response.body)['entries']).to eq []
      end
    end

    context 'when entrant was not found' do
      before do
        get :search, params: { id: entry.id, q: 'baby' }, format: :json
      end

      it { expect(response.status).to eq 200 }

      it 'returns an empty array' do
        expect(JSON.parse(response.body)['entries']).to eq []
      end
    end
  end

  describe 'GET /voters_by_day' do
    before { sign_in(user) }

    context 'when have no votes' do
      it 'returns status :not_found' do
        get :voters_by_day, params: { id: entry.id }, format: :json

        expect(response).to have_http_status :not_found
      end
    end

    context 'with votes' do
      before { create_list :vote, 2, entry: entry, user: user, source_type: :user }

      it 'return grouped votes' do
        get :voters_by_day, params: { id: entry.id }, format: :json

        expect(JSON.parse(response.body)['votes'].size).to eq(1)
      end

      context 'when page params present' do
        it 'returns no voted' do
          get :voters_by_day, params: { id: entry.id, page: 3, per: 1 }

          expect(JSON.parse(response.body)['message']).to eq('No voted')
        end
      end
    end
  end

  describe 'GET /ranking_details' do
    before do
      get :ranking_details, params: { id: entry.id }, format: :json
    end

    it { expect(response).to match_response_schema('entries/ranking_details') }

    it { expect(JSON.parse(response.body)['entry']['id']).to eq entry.id }
  end
end
