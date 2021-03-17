require 'rails_helper'

RSpec.describe Users::FromOmniauth do
  subject { described_class }

  let(:facebook_hash) do
    OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
                                                                    'provider' => 'facebook',
                                                                    'uid' => '123545',
                                                                    'info' => {
                                                                      'email' => 'example_facebook@xyze.it',
                                                                      'name' => 'Alberto Pellizzon',
                                                                      'first_name' => 'Alberto',
                                                                      'last_name' => 'Pellizzon',
                                                                      'image' => 'https://pathtoimage.com/image'
                                                                    }, 'extra' => { 'raw_info' => {} }
                                                                  })
  end

  context 'when deactivated user registers again' do
    before { create :user, :deactivated, provider: 'facebook', uid: '123545' }

    it 'creates new user with same provider and uid' do
      expect { subject.new(auth: facebook_hash).call }.to change(User.where(provider: 'facebook', uid: '123545'), :count).from(1).to(2)
    end
  end
end
