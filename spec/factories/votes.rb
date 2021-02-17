FactoryBot.define do
  factory :vote do
    value { FFaker::Random.rand }
    user
  end
end
