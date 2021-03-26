require 'active_support/core_ext/integer/time'

Rails.application.routes.default_url_options[:host] = 'localhost'
Rails.application.routes.default_url_options[:port] = 3000

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # disable yarn integrity
  config.webpacker.check_yarn_integrity = false

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :amazon

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Annotate rendered view with file names.
  # config.action_view.annotate_rendered_view_with_filenames = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true
  config.after_initialize do
    config.logger = Rails.logger

  end
end

# HttpLog.configure do |config|

#   # Enable or disable all logging
#   config.enabled = true

#   # You can assign a different logger or method to call on that logger
#   config.logger = Rails.logger
#   config.logger_method = :log

#   # I really wouldn't change this...
#   config.severity = Logger::Severity::DEBUG

#   # Tweak which parts of the HTTP cycle to log...
#   config.log_connect   = true
#   config.log_request   = true
#   config.log_headers   = false
#   config.log_data      = true
#   config.log_status    = true
#   config.log_response  = true
#   config.log_benchmark = true

#   # ...or log all request as a single line by setting this to `true`
#   config.compact_log = false

#   # You can also log in JSON format
#   config.json_log = false

#   # Prettify the output - see below
#   config.color = false

#   # Limit logging based on URL patterns
#   config.url_whitelist_pattern = nil
#   config.url_blacklist_pattern = nil

#   # Mask sensitive information in request and response JSON data.
#   # Enable global JSON masking by setting the parameter to `/.*/`
#   config.url_masked_body_pattern = nil

#   # You can specify any custom JSON serializer that implements `load` and `dump` class methods
#   # to parse JSON responses
#   config.json_parser = JSON

#   # When using graylog, you can supply a formatter here - see below for details
#   config.graylog_formatter = nil

#   # Mask the values of sensitive request parameters
#   config.filter_parameters = %w[password]
  
#   # Customize the prefix with a proc or lambda
#   config.prefix = ->{ "[httplog] #{Time.now} " }
# end