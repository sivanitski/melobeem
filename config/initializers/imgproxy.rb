Imgproxy.configure do |config|
  # imgproxy endpoint
  #
  # Full URL to where your imgproxy lives.
  config.endpoint = 'http://localhost:8080'

  # Next, you have to provide your signature key and salt.
  # If unsure, check out https://github.com/imgproxy/imgproxy/blob/master/docs/configuration.md first.

  # Hex-encoded signature key
  config.hex_key = "df3dacc91cb6a655a66db98026817605ae1a1d1b1b2a9ca8e743ff6f075a4257"
  # Hex-encoded signature salt
  config.hex_salt = "6e9ec0a17c65f766a93644d1d7fa3cb9ebfa822e71cc9abc0c6f306c33f5d36e"

  # Base64 encode all URLs
  # config.base64_encode_urls = true

  # Always escape plain URLs
  # config.always_escape_plain_urls = true
end

Imgproxy.extend_active_storage!(use_s3: true)
