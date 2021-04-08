require 'rails_helper'

RSpec.describe API::V1::Users::FriendsController do
  let(:competition) { create(:competition) }
  let(:user)        { create(:user) }

  before { sign_in(user) }

  describe 'GET /index' do
    let(:friend1) { create :user }
    let(:friend2) { create :user }

    before do
      create :friendship, user: user, friend: friend1
      create :friendship, user: user, friend: friend2
      get :index, params: { user_id: user.id }, format: :json
    end

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('friends/index') }

    it 'returns all user friends' do
      expect(user.friends.ids - [friend1.id, friend2.id]).to eq []
    end
  end

  describe 'POST /add_friend' do
    context 'when user was not found' do
      it 'return error' do
        post :add_friend, params: { user_id: 999 }
        expect(response.status).to be(404)
      end
    end

    context 'when user was found' do
      let(:friend) { create(:user) }

      it 'add friend' do
        post :add_friend, params: { user_id: friend.id }
        expect(response).to match_response_schema('friends/add_friend')
      end
    end

    context 'when already friends' do
      let(:friend) { create(:user) }

      it 'will not add friend' do
        user.friends << friend
        post :add_friend, params: { user_id: friend.id }
        expect(JSON.parse(response.body)['message']).to eq('User and you are already friends')
      end
    end
  end
end
