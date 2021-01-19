require 'rails_helper'

describe 'Votes API', type: :request do
  let(:api_path) { '/api/v1/votes' }
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, competition: competition, user: user) }
  let!(:vote) { create(:vote, entry: entry, user: user) }

  describe 'POST /api/v1/votes' do
    context 'with valid attributes' do
      it 'saves a new vote in database' do
        expect do
          post api_path, { params: { vote: { value: vote.value, entry_id: entry.id, user_id: user.id } } }
        end.to change(Vote, :count).by(1)
      end

      it 'returns status :created' do
        post api_path, { params: { vote: { value: vote.value, entry_id: entry.id, user_id: user.id } } }
        expect(response.status).to eq 201
      end
    end

    context 'with invalid attributes' do
      it 'does not save the vote' do
        expect do
          post api_path, { params: { vote: { value: nil, entry_id: entry.id, user_id: user.id } } }
        end.not_to change(Vote, :count)
      end

      it 'return status :unprocessable_entity' do
        post api_path, { params: { vote: { value: nil, entry_id: entry.id, user_id: user.id } } }
        expect(response.status).to eq 422
      end
    end
  end
end
