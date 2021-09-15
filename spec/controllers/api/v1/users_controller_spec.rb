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
      before { get :show_share_modal, format: :json }

      it 'returns true' do
        expect(JSON.parse(response.body)).to eq true
      end

      it { expect(response.status).to eq 200 }
    end

    context 'when user has votes for today' do
      before do
        create :vote, user: user, source_type: 'user'
        get :show_share_modal, format: :json
      end

      it 'returns false' do
        expect(JSON.parse(response.body)).to eq false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe 'PUT #take_additional_prize' do
    before { sign_in user }

    context 'when user entry has additional prize' do
      let!(:entry) { create :entry, user: user, competition: competition, competition_additional_prize: 10 }

      it 'increments premium spins value of user' do
        expect do
          put :take_additional_prize, params: { entry_id: entry.id }, format: :json
        end.to change(user, :premium_spins).by(10)
      end

      it 'changes notifications count' do
        expect do
          put :take_additional_prize, params: { entry_id: entry.id }, format: :json
        end.to change(user.notifications, :count).from(0).to(1)
      end
    end

    context 'when user does not have any entries with additional prizes' do
      let!(:entry) { create :entry, user: user, competition: competition }

      it 'not changes premium spins value of user' do
        expect do
          put :take_additional_prize, params: { entry_id: entry.id }, format: :json
        end.not_to change(user, :premium_spins)
      end

      it 'not changes notifications count' do
        expect do
          put :take_additional_prize, params: { entry_id: entry.id }, format: :json
        end.not_to change(user.notifications, :count)
      end
    end
  end
end
