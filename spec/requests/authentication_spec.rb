require 'rails_helper'

RSpec.describe 'Authentication Validations', type: :request do
  let(:user) { create :user }

  describe '/api/v1/auth/validate_token' do
    context 'when signed in' do
      sign_in(:user)

      it 'respond with success' do
        get '/api/v1/auth/validate_token'
        expect(response).to have_http_status(:success)
      end
    end

    context 'when signed out' do
      it 'respond with unauthorized' do
        get '/api/v1/auth/validate_token'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe '/api/v1/auth/sign_in' do
    context 'when signed in' do
      it 'respond with success' do
        params = { email: user.email, password: user.password }

        post '/api/v1/auth/sign_in', params: params
        expect(response).to have_http_status(:success)
      end
    end

    context 'when not signed in' do
      it 'respond with unauthorized' do
        post '/api/v1/auth/sign_in'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe '/api/v1/auth/sign_out' do
    sign_in(:user)

    it 'respond with success' do
      delete '/api/v1/auth/sign_out'
      expect(response).to have_http_status(:success)
    end
  end

  describe '/api/v1/auth' do
    it 'respond with success' do
      params = { user: { email: 'test@test.com', password: '123123123', name: 'Test' } }

      post '/api/v1/auth', params: params
      expect(response).to have_http_status(:success)
    end
  end
end
