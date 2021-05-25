require 'rails_helper'
require 'stripe_mock'

describe Spins::Buy do
  let(:product) { create(:product_spinner) }
  let(:result) { described_class.new.call(product: product, user: entry.user) }

  before { Product.country = 'US' }

  it_behaves_like 'Buy operation'
end
