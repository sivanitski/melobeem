FactoryBot.define do
  factory :prize_time do
    value { [10, 20, 30].sample }

    entry
  end
end
