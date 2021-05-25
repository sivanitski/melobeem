require 'rails_helper'

RSpec.describe API::V1::ChargesController do
  let(:entry) { create :entry }
  let(:product_spinner) { create :product_spinner }
  let(:product_votes) { create :product_votes }
  let(:stripe_helper) { StripeMock.create_test_helper }

  before do
    StripeMock.start
    sign_in entry.user
  end

  after { StripeMock.stop }

  describe 'POST #buy_votes' do
    before { post :buy_votes, params: { entry_id: entry.id, product_id: product_votes.id }, format: :json }

    it_behaves_like 'Charged'
  end

  describe 'POST #buy_spins' do
    before { post :buy_spins, params: { product_id: product_spinner.id }, format: :json }

    it_behaves_like 'Charged'
  end
end
