FactoryBot.define do
  factory :competition do
    title { FFaker::Name.name }
    prize_cents { 10_000 }
    revenue { 100_000 }
    starts_at { FFaker::Time.datetime }
    ends_at { FFaker::Time.datetime }

    trait :finished do
      status { :finished }
    end
  end
end
