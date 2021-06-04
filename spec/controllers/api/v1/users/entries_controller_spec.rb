require 'rails_helper'

RSpec.describe API::V1::Users::EntriesController do
  let(:competition) { create(:competition) }
  let(:user) { create(:user) }
  let(:entry) { create(:entry, competition: competition, user: user) }

  before { sign_in user }

  describe 'GET #edit' do
    before { get :edit, params: { id: entry.id }, format: :json }

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/show') }
  end

  describe 'PATCH #update' do
    before { patch :update, params: { id: entry.id, entry: attributes_for(:entry) }, format: :json }

    it { expect(response.status).to eq 200 }

    it { expect(response).to match_response_schema('entries/ranked') }
  end

  describe 'DELETE #destroy' do
    context 'when entry was found' do
      let!(:entry1) { create :entry, user: user }

      it 'deletes user entry' do
        expect do
          delete :destroy, params: { id: entry1.id }, format: :json
        end.to change(user.entries, :count).from(1).to(0)
      end

      it 'returns status ok' do
        delete :destroy, params: { id: entry1.id }, format: :json
        expect(response.status).to eq 200
      end

      it 'matches the scheme entries/show' do
        delete :destroy, params: { id: entry1.id }, format: :json
        expect(response).to match_response_schema('entries/show')
      end
    end

    context 'when entry was not found' do
      before { delete :destroy, params: { id: 10 }, format: :json }

      it 'returns status not found' do
        expect(response.status).to eq 404
      end

      it 'returns error message' do
        expect(JSON.parse(response.body)['error']).to eq("Couldn't find Entry record!")
      end
    end
  end
end
