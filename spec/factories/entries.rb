FactoryBot.define do
  factory :entry do
    gender { FFaker::Number.rand(0..1) }
  end
end
