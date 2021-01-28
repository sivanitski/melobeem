require 'rails_helper'

describe 'Leaderboard API', type: :request do
  let(:api_path) { '/api/v1/leaderboard' }
  let(:competition) { create(:competition) }

  describe 'GET /api/v1/leaderboard' do
    before do
      create(:entry, competition: competition, user: create(:user))
      create(:entry, competition: competition, user: create(:user))
      create(:entry, competition: competition, user: create(:user))
    end

    it 'return list of entries' do
      get api_path, { params: { page: 1, per: 2 } }
      expect(JSON.parse(response.body)['entries'].size).to be(2)
    end
  end
end
