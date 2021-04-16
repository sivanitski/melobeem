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

  describe 'GET #check_presence' do
    before { sign_in user }

    context 'when premium spins present and free spin was not spent yet' do
      before do
        user.update!(premium_spins: 2)
        get :check_presence, format: :json
      end

      it 'returns premium type count of premium spins' do
        expect(JSON.parse(response.body)['type']).to eq('premium')
        expect(JSON.parse(response.body)['count']).to eq(user.premium_spins)
      end
    end

    context 'when user does not have any premium spins and free spin was not spent yet' do
      before { get :check_presence, format: :json }

      it 'returns free type in response' do
        expect(JSON.parse(response.body)['type']).to eq('free')
      end
    end

    context 'when free spin was already spent today' do
      before do
        create :spin, user: user
        get :check_presence, format: :json
      end

      it 'returns message No spin' do
        expect(JSON.parse(response.body)['message']).to eq('No spin')
      end
    end
  end

  describe 'GET #time_to_free_spin' do
    before { sign_in user }

    context 'when free spin was found' do
      let!(:spin) { create :spin, user: user }

      before { get :time_to_free_spin, format: :json }

      it { expect(response.status).to eq 200 }

      it 'returns message with remaining time' do
        expect(JSON.parse(response.body)['message']).to eq (Date.current.end_of_day - spin.created_at).round
      end
    end

    context 'when free spin was not found' do
      before { get :time_to_free_spin, format: :json }

      it { expect(response.status).to eq 204 }

      it 'returns empty response' do
        expect(response.body).to be_empty
      end
    end
  end
end
