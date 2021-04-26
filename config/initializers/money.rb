oxr = Money::Bank::OpenExchangeRatesBank.new
oxr.app_id = ENV['OPENEXCHANGE_APPID']
Money.default_bank = oxr
OXR = oxr

return if Rails.env.production?

oxr.ttl_in_seconds = 365.days.to_i
oxr.cache = Rails.root.join('spec/fixtures/currency_rates.json').to_s
