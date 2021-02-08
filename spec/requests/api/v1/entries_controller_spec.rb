require 'rails_helper'

RSpec.shared_examples 'success status and correct schema' do
  it { expect(response.status).to eq 200 }

  it { expect(response).to match_response_schema('entries/show') }
end

describe 'Entries API', type: :request do
  let(:competition) { create(:competition) }
  let(:user)        { create(:user) }
  let(:entry) { create(:entry, competition: competition, user: user, gender: 'male') }

  describe 'Competitions::EntriesController' do
    let(:api_path) { "/api/v1/competitions/#{competition.id}/entries" }

    describe '#index' do
      before do
        create(:entry, competition: competition, user: user)

        get api_path
      end

      it { expect(response.status).to eq 200 }

      it { expect(JSON.parse(response.body)['meta']['total_count']).to eq 1 }

      it { expect(response).to match_response_schema('entries/index') }
    end

    describe '#create' do
      sign_in(:user)

      before { post api_path, { params: { entry: { gender: 'male' } } } }

      include_examples 'success status and correct schema'

      it { expect(Entry.count).to be 1 }
    end

    describe '#show' do
      let(:api_path) { "/api/v1/competitions/#{competition.id}/entries/#{entry.id}" }

      before { get api_path }

      include_examples 'success status and correct schema'

      it { expect(JSON.parse(response.body)['entry']['id']).to eq entry.id }
    end

    describe '#latest_voters' do
      let(:api_path) { "/api/v1/competitions/#{competition.id}/entries/#{entry.id}/latest_voters" }

      context 'when voters are present' do
        before do
          users = create_list :user, 3
          create :vote, entry: entry, user: users.first
          create :vote, entry: entry, user: users.second
          create :vote, entry: entry, user: users.first
          create :vote, entry: entry, user: users.last
          get api_path
        end

        it 'returns unique voters ids' do
          ids = JSON.parse(response.body)['users'].each_with_object([]) { |user, arr| arr << user['id'] }
          expect(ids.uniq).to eq ids
        end

        it 'ID of users of the most recent votes are equal ID of users from the action response' do
          ids = JSON.parse(response.body)['users'].each_with_object([]) { |user, arr| arr << user['id'] }
          expect(ids).to eq Vote.order(created_at: :desc).pluck(:user_id).uniq
        end

        it { expect(response).to match_response_schema('entries/latest_voters') }
      end

      context 'when voters are absent' do
        before { get api_path }

        it 'returns 404 status' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns No voted message' do
          expect(JSON.parse(response.body)['message']).to eq 'No voted'
        end
      end
    end
  end

  describe 'Users::EntriesController' do
    sign_in(:user)

    describe '#update' do
      let(:api_path) { "/api/v1/users/entries/#{entry.id}" }

      before { put api_path, { params: { entry: { gender: 'female' } } } }

      include_examples 'success status and correct schema'

      it { expect(JSON.parse(response.body)['entry']['gender']).to eq 'female' }
    end

    describe '#edit' do
      let(:api_path) { "/api/v1/users/entries/#{entry.id}/edit" }

      before { get api_path }

      include_examples 'success status and correct schema'

      it { expect(JSON.parse(response.body)['entry']['gender']).to eq 'male' }
    end

    describe '#destroy' do
      let(:api_path) { "/api/v1/users/entries/#{entry.id}" }
      let(:user2)    { create(:user) }

      before { delete api_path }

      include_examples 'success status and correct schema'

      it { expect(Entry.count).to be 0 }
    end
  end
end
