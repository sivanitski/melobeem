FactoryBot.define do
  factory :vote do
    value { FFaker::Number.rand }
  end
end
