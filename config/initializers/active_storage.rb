Rails.application.reloader.to_prepare do
  # TODO: modify settings for any other environment

  ActiveStorage::Current.host = ENV.fetch('ACTIVE_STORAGE_HOST', 'http://localhost:3000')
end
