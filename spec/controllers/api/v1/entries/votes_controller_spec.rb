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
end
