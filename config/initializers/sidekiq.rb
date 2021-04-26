require 'sidekiq'
require 'sidekiq/scheduler'
require 'sidekiq-scheduler/web'

Sidekiq.configure_server do |config|
  config.logger = Rails.logger
  config.logger.level = Logger::WARN
  config.redis = { url: ENV['REDIS_URL'], network_timeout: 5 }

  config.on(:startup) do
    schedule = YAML.safe_load(ERB.new(Rails.root.join('config/sidekiq_scheduler.yml').read).result)
    Sidekiq.schedule = schedule
    Sidekiq::Scheduler.reload_schedule!
  end
end

Sidekiq.configure_client do |config|
  config.logger = Rails.logger
  config.redis = { url: ENV['REDIS_URL'], network_timeout: 5 }
end
