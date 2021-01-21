Rails.application.reloader.to_prepare do
  # TODO: modify settings for any other environment

  ActiveStorage::Current.host = if Rails.env.development?
                                  'http://localhost:3000'
                                else
                                  'https://cdn.domain.com'
                                end
end
