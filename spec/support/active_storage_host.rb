RSpec.configure do |config|
  config.before do
    ActiveStorage::Current.host = 'http://localhost:3000'
  end
end
