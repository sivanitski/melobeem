require_relative 'boot'
require_relative '../lib/middleware/fingerprint_middleware'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Melobeem
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    config.active_job.queue_adapter = :sidekiq
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    ActiveStorage::Engine.config
                         .active_storage
                         .content_types_to_serve_as_binary
                         .delete('image/svg+xml')

    config.middleware.use FingerprintMiddleware
  end
end
