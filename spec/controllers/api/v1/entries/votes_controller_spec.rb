require 'rails_helper'

RSpec.shared_examples 'success status' do
  it { expect(response.status).to eq 200 }
end

RSpec.describe API::V1::Entries::VotesController do
  let(:user) { create :user }
  let(:entry) { create :entry }
  let(:uniq_key) { [entry.id, user.id].join(':') }

  describe 'GET /expiration_time_for_free' do
    include_examples 'success status'

    context 'when redis key of free vote was founded' do
      before do
        Redis.current.setex(uniq_key, Votes::Create::TIME_BETWEEN_VOTING, uniq_key)
        sign_in user
        get :expiration_time_for_free, params: { entry_id: entry.id, user_id: user.id }, format: :json
      end

      it 'returns remaining time' do
        expect(JSON.parse(response.body)['ttl_in_seconds']).to eq Votes::Create::TIME_BETWEEN_VOTING
      end
    end

    context 'when redis key is absent' do
      before do
        sign_in user
        get :expiration_time_for_free, params: { entry_id: entry.id, user_id: user.id }, format: :json
      end

      it 'returns zero' do
        expect(JSON.parse(response.body)['ttl_in_seconds']).to eq 0
      end
    end
  end

  describe 'POST /create_free' do
    before { sign_in user }

    context 'with valid attributes' do
      before { post :create_free, params: { value: 1, entry_id: entry.id, user_id: user.id }, format: :json }

      it { expect(Vote.count).to eq 1 }

      it 'returns status :created' do
        expect(response.status).to eq 201
      end

      it 'returns time between voting' do
        expect(JSON.parse(response.body)['ttl_in_seconds']).to eq Votes::Create::TIME_BETWEEN_VOTING
      end
    end

    context 'with invalid attributes' do
      before { post :create_free, params: { value: nil, entry_id: entry.id, user_id: user.id }, format: :json }

      it 'does not save the vote' do
        expect { response }.not_to change(Vote, :count)
      end

      it 'return status :unprocessable_entity' do
        expect(response.status).to eq 422
      end

      it 'returns error message' do
        expect(JSON.parse(response.body)['message']).to eq "Validation failed: Value can't be blank"
      end
    end
  end
end
