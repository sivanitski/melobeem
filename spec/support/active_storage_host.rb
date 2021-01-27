RSpec.configure do |config|
  config.before do
    ActiveStorage::Current.host = ENV.fetch('ACTIVE_STORAGE_HOST', 'http://localhost:3000')
  end
end
