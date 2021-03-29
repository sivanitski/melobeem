FactoryBot.define do
  factory :notification do
    text { FFaker::Tweet.body }
    source_type { %w[unlock vote purchase bonus].sample }
    user
    entry
  end
end
