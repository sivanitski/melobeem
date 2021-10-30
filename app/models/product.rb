class Product < ApplicationRecord
  class_attribute :country

  enum product_type: { vote: 'vote', spinner: 'spinner' }

  has_one_attached :image, dependent: :destroy
  has_many :purchase_transactions, dependent: :nullify

  validates :tier_id, :title, :value, presence: true

  def price
    @price ||= tier.formatted_retail_price
  end

  def price_cents
    @price_cents ||= (tier.retail_price * 100).to_i
  end

  def price_currency
    @price_currency ||= tier.currency_code
  end

  def discounted_price_cents
    @discounted_price_cents ||= (discounted_tier.retail_price * 100).to_i
  end

  def discounted_price
    discounted_tier.formatted_retail_price
  end

  def discounted_tier
    id = (tier_id / 1.8).ceil
    tier(id)
  end

  def tier(id = tier_id)
    AppStorePricingMatrix.find_by({ tier: id, country: Product.country })
  end
end
