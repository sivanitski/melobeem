require 'rails_helper'

RSpec.describe API::V1::SpinsController do
  let!(:competition) { create :competition }
  let!(:user) { create :user }

  describe 'POST #create' do
    before do
      create :entry, user: user, competition: competition
      sign_in user
      post :create, format: :json
    end

    context 'when result is success' do
      it { expect(response.status).to eq 201 }

      it { expect(JSON.parse(response.body)['value']).to eq Spin.first.value }
    end

    context 'when result is failed' do
      before { post :create, format: :json }

      it { expect(response.status).to eq 404 }

      it { expect(JSON.parse(response.body)['message']['error']).to eq 'No spin' }
    end
  end
end
