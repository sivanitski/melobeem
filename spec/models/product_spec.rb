require 'rails_helper'

RSpec.describe Product, type: :model do
  it { is_expected.to have_many(:purchase_transactions) }

  it { is_expected.to have_attributes(country: 'US') }

  it { is_expected.to validate_presence_of(:tier_id) }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:value) }

  it do
    expect(subject).to define_enum_for(:product_type).with_values(vote: 'vote', spinner: 'spinner')
                                                     .backed_by_column_of_type(:enum)
  end

  describe 'price actions' do
    let(:product) { create(:product_votes, tier_id: 10) }

    before { described_class.country = 'US' }

    describe '#price' do
      it 'return product price $9.99' do
        expect(product.price).to eq('$9.99')
      end
    end

    describe '#price_cents' do
      it 'return product price in cents' do
        expect(product.price_cents).to eq(999)
      end
    end

    describe '#price_currency' do
      it 'return product price currency' do
        expect(product.price_currency).to eq('USD')
      end
    end

    describe '#tier' do
      let(:product_tier) { AppStorePricingMatrix.find_by({ tier: 10, country: 'US' }) }

      it 'return product tier' do
        expect(product.tier).to eq(product_tier)
      end
    end
  end
end
