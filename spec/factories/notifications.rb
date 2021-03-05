FactoryBot.define do
  factory :notification do
    title { FFaker::Book.title }
    text { FFaker::Tweet.body }
    status { FFaker::Name.name }
    user
  end
end
