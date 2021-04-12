FactoryBot.define do
  prize = PRIZES.sample

  factory :prize do
    level { LEVELS.keys.sample }
    source_type { prize['source_type'] }
    value { prize['value'] }

    entry
  end
end
