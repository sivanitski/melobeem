require 'rails_helper'

RSpec.describe Users::OmniauthCallbacksController, type: :controller do
  let(:facebook_hash) do
    OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
                                                                    'provider' => 'facebook',
                                                                    'uid' => '123545',
                                                                    'info' => {
                                                                      'email' => 'example_facebook@xyze.it',
                                                                      'name' => 'Alberto Pellizzon',
                                                                      'first_name' => 'Alberto',
                                                                      'last_name' => 'Pellizzon',
                                                                      'image' => nil
                                                                    }, 'extra' => { 'raw_info' => {} }
                                                                  })
  end

  describe '#facebook' do
    before do
      request.env['devise.mapping'] = Devise.mappings[:user]
      request.env['omniauth.auth'] = facebook_hash
    end

    context 'with a new facebook user' do
      before { get :facebook }

      it { expect(response).to match_response_schema('users/omniauth') }

      it { expect(JSON.parse(response.body)['user']['name']).to eq('Alberto Pellizzon') }
    end
  end
end
