require 'rails_helper'

RSpec.describe Users::FromOmniauth do
  let(:remote_ip) { '::1' }
  let(:facebook_hash) do
    OmniAuth::AuthHash.new({
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

  describe '#call' do
    subject(:user_from_oauth) { described_class.new(auth: facebook_hash, remote_ip: remote_ip).call }

    context 'when deactivated user registers again' do
      before { create :user, :deactivated, provider: 'facebook', uid: '123545' }

      it 'creates new user with same provider and uid' do
        expect { subject }.to change(User.where(provider: 'facebook', uid: '123545'), :count).from(1).to(2)
      end
    end

    context 'when user already present' do
      it 'returns existing user' do
        user = create(:user, provider: 'facebook', uid: '123545')

        expect(user_from_oauth).to eq(user)
      end
    end

    context 'when user is not present yet' do
      before do
        uri = URI.parse('https://pathtoimage.com/image')
        file = File.open(Rails.root.join('spec/fixtures/user_image.png'))
        allow(OpenURI).to receive(:open_uri).with(uri).and_return(file)
      end

      it 'creates new user with valid attributes' do
        expect { subject }.to change(User, :count).by(1)
      end

      it 'creates user with valid attributes' do
        expect(user_from_oauth).to have_attributes({ provider: 'facebook', uid: '123545',
                                                     email: 'example_facebook@xyze.it', name: 'Alberto Pellizzon' })
      end

      it 'attaches image' do
        expect(user_from_oauth.avatar).to be_attached
      end
    end
  end
end
