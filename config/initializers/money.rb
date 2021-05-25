MoneyRails.configure do |config|
  config.rounding_mode = BigDecimal::ROUND_HALF_EVEN

  config.default_currency = :usd

  oxr = Money::Bank::OpenExchangeRatesBank.new
  oxr.cache = 'cache.json'
  oxr.app_id = ENV['OPENEXCHANGE_APPID']
  oxr.ttl_in_seconds = 1.day.to_i

  if Rails.env.test? || Rails.env.development?
    oxr.ttl_in_seconds = 365.days.to_i
    oxr.cache = Rails.root.join('spec/fixtures/currency_rates.json').to_s
  end

  oxr.update_rates

  config.default_bank = oxr

  config.no_cents_if_whole = false
end
