FactoryBot.define do
  factory :friendship do
    association :friend, factory: :user
    user
  end
end
