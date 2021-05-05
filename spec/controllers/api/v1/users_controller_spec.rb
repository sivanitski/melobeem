require 'rails_helper'

RSpec.describe API::V1::UsersController do
  let(:user) { create :user }
  let!(:competition) { create :competition }

  describe 'GET #show' do
    before { get :show, params: { id: user.id }, format: :json }

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/show') }

    it { expect(JSON.parse(response.body)['user']['id']).to eq user.id }
  end

  describe 'GET #entries' do
    before do
      create_list :entry, 2, user: user
      get :entries, params: { id: user.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/entries') }
  end

  describe 'DELETE #deactivate' do
    before do
      sign_in user
      delete :deactivate, params: { id: user.id }, format: :json
    end

    it { expect(response.status).to eq 204 }
  end

  describe 'GET #previous_entries' do
    let(:prev_competition) { create :competition, :finished }
    let!(:prev_entry) { create :entry, user: user, competition: prev_competition }
    let!(:entry) { create :entry, user: user, competition: competition }

    before do
      sign_in user
      get :previous_entries, params: { id: user.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('users/entries') }

    it 'returns entry from previous competition' do
      expect(response.body).to include(prev_entry.name)
    end

    it 'does not return entry from current competition' do
      expect(response.body).not_to include(entry.name)
    end
  end

  describe 'GET #show_share_modal' do
    before { sign_in user }

    context 'when user does not have any votes for today' do
      before { get :show_share_modal, params: { id: user.id }, format: :json }

      it 'returns true' do
        expect(JSON.parse(response.body)).to eq true
      end

      it { expect(response.status).to eq 200 }
    end

    context 'when user has votes for today' do
      before do
        create :vote, user: user
        get :show_share_modal, params: { id: user.id }, format: :json
      end

      it 'returns false' do
        expect(JSON.parse(response.body)).to eq false
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
