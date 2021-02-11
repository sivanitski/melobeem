FactoryBot.define do
  factory :entry do
    name { FFaker::Name.name }
    gender { FFaker::Gender.binary }
  end
end
