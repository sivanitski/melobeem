database = Rails.root.join('lib/GeoLite2-Country.mmdb')
$geoip = MaxMind::GeoIP2::Reader.new(database) # rubocop:disable Style/GlobalVars
