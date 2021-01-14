FactoryBot.define do
  factory :user do
    name { FFaker::Name.name }
    email { FFaker::Internet.email }
    uid { email }
    password { SecureRandom.hex(8) }
  end
end
