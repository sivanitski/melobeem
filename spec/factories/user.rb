FactoryBot.define do
  factory :user do
    name { FFaker::Name.name }
    email { FFaker::Internet.email }
    provider { FFaker::Internet.domain_word }
    uid { FFaker::Internet.slug }
    password { SecureRandom.hex(8) }

    trait :deactivated do
      deactivated { true }
    end
  end
end
