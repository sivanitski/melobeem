FactoryBot.define do
  factory :entry do
    name { FFaker::Name.name }
    competition
    user
  end
end
