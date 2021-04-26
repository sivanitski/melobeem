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

      it 'update notifications read status' do
        expect(user.notifications.where(read: false)).to be_blank
      end

      it 'return notification read after update' do
        expect(JSON.parse(response.body)['notifications'][0]['read']).to be_falsey
      end
    end

    context 'when notifications are absent' do
      before { get :index, format: :json }

      it { expect(response.status).to eq 200 }

      it 'returns No voted message' do
        expect(JSON.parse(response.body)['notifications']).to eq []
      end
    end
  end

  describe 'GET #unread_present' do
    before { sign_in user }

    context 'when notifications are present' do
      context 'when notifications already read' do
        before do
          create_list :notification, 2, user: user, read: true
          get :unread_present, format: :json
        end

        it { expect(response.status).to eq 200 }

        it { expect(response).to match_response_schema('notifications/unread_present') }

        it 'return true' do
          expect(JSON.parse(response.body)['unread_present']).to be_falsey
        end
      end

      context 'when notifications not read' do
        before do
          create_list :notification, 2, user: user
          get :unread_present, format: :json
        end

        it { expect(response.status).to eq 200 }

        it { expect(response).to match_response_schema('notifications/unread_present') }

        it 'return false' do
          expect(JSON.parse(response.body)['unread_present']).to be_truthy
        end
      end
    end

    context 'when notifications are absent' do
      before { get :unread_present, format: :json }

      it { expect(response.status).to eq 200 }

      it 'returns false' do
        expect(JSON.parse(response.body)['unread_present']).to be_falsey
      end
    end
  end
end
