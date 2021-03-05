require 'rails_helper'

RSpec.describe API::V1::NotificationsController do
  let(:user) { create :user }

  describe 'GET #index' do
    before { sign_in user }

    context 'when notifications are present' do
      before do
        create_list :notification, 2, user: user
        get :index, format: :json
      end

      it { expect(response.status).to eq 200 }

      it { expect(response).to match_response_schema('notifications/index') }
    end

    context 'when notifications are absent' do
      before { get :index, format: :json }

      it { expect(response.status).to eq 200 }

      it 'returns No voted message' do
        expect(JSON.parse(response.body)['notifications']).to eq []
      end
    end
  end
end
