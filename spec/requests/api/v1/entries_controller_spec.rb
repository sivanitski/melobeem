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
