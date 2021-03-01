require 'rails_helper'

RSpec.describe API::V1::UsersController do
  let(:user) { create :user }

  describe 'GET /show' do
    before do
      create :competition
      get :show, params: { id: user.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/show') }

    it { expect(JSON.parse(response.body)['user']['id']).to eq user.id }
  end
end
