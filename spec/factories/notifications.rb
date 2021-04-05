FactoryBot.define do
  factory :notification do
    source_type { %w[unlock vote purchase bonus].sample }
    user
    entry
  end
end
