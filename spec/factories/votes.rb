FactoryBot.define do
  factory :vote do
    value { FFaker::Random.rand }
    user
    entry
    source_type { %w[user spinner bonus].sample }
  end
end
