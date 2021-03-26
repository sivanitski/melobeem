source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# serializer
gem 'active_model_serializers', '~> 0.10.0'

# pagination
gem 'kaminari-activerecord'

# active record PG extension
gem 'activerecord-postgres_enum'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'
gem 'aws-sdk-s3', require: false
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false
# imgproxy
gem 'imgproxy'
# explicitly adding mimemagic because 0.3.5 got yanked
gem 'mimemagic', '0.3.5', path: './vendor/mimemagic-0.3.5'

# environment variables
gem 'dotenv-rails'
# enforcing Rails best practices and coding conventions
gem 'rubocop-performance', require: false
gem 'rubocop-rails', require: false
gem 'rubocop-rspec', require: false

# authentication
gem 'devise'
gem 'omniauth', '~> 1.9.1' # TODO: update to v2, resolve issue with devise
gem 'omniauth-facebook'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry', require: true
  gem 'rspec-rails', '~> 4.0.2'
end

# payments
gem 'stripe'

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'listen', '~> 3.3'
  gem 'rack-mini-profiler', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  # help to kill N+1 queries and unused eager loading
  gem 'bullet'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'database_cleaner-active_record'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'webdrivers'

  # gem 'factory_girl_rails'
  gem 'factory_bot_rails'
  gem 'ffaker'

  gem 'json-schema'

  # testing Stripe
  gem 'stripe-ruby-mock', '~> 3.0.1', require: 'stripe_mock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem "koala"
