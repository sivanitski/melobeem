require 'rails_helper'

RSpec.describe API::V1::CompetitionsController do
  describe 'GET /current' do
    before do
      create :competition
      get :current, format: :json
    end

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it { expect(response).to match_response_schema('competitions/current') }
  end
end
