require 'rails_helper'
require 'stripe_mock'

describe Votes::Buy do
  let(:product) { create(:product_votes) }
  let(:result) { described_class.new.call(params: { entry_id: entry.id }, product: product, user: entry.user) }

  before { Product.country = 'US' }

  it_behaves_like 'Buy operation'
end
