FactoryBot.define do
  factory :competition do
    title { FFaker::Name.name }
    prize_cents { FFaker::Number.rand }
    status { FFaker::Name.name }
    starts_at { FFaker::Time.datetime }
    ends_at { FFaker::Time.datetime }
  end
end
