FactoryBot.define do
  factory :product do
    tier_id { rand(1..50) }
    title { 'example' }
    value { rand(1..50) }

    factory :product_spinner do
      title { '100 votes' }
      value { 100 }
      product_type { 'vote' }
    end

    factory :product_votes do
      title { '10 spins' }
      value { 10 }
      product_type { 'spinner' }
    end
  end
end
