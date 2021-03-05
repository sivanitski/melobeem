require 'rails_helper'

RSpec.describe API::V1::UsersController do
  let(:user) { create :user }

  before { create :competition }

  describe 'GET #show' do
    before { get :show, params: { id: user.id }, format: :json }

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/show') }

    it { expect(JSON.parse(response.body)['user']['id']).to eq user.id }
  end

  describe 'GET /user_entries' do
    before do
      create_list :entry, 2, user: user
      get :user_entries, params: { id: user.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/user_entries') }
  end
end
