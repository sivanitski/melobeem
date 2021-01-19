FactoryBot.define do
  factory :entry do
    gender { FFaker::Gender.binary }
  end
end
