require 'rails_helper'

RSpec.describe API::V1::CompetitionsController do
  let(:competition1) { create :competition }
  let(:competition2) { create :competition }

  before { create :competition }

  describe 'GET #current' do
    before do
      get :current, format: :json
    end

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it { expect(response).to match_response_schema('competitions/current') }
  end

  describe 'GET #previous_winners' do
    before do
      create :entry, competition: competition1, total_votes: 50
      create :entry, competition: competition2, total_votes: 30
      get :previous_winners, format: :json
    end

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it { expect(response).to match_response_schema('competitions/previous_winners') }
  end

  describe 'GET #competition_prizes' do
    before { get :competition_prizes, format: :json }

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it { expect(response).to match_response_schema('competitions/competition_prizes') }
  end
end
