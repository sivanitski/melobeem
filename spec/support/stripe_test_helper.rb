def generate_stripe_signature(payload)
  time = Time.zone.now
  secret = Rails.application.credentials.stripe[:stripe_endpoint_secret]
  signature = Stripe::Webhook::Signature.compute_signature(time, payload, secret)
  Stripe::Webhook::Signature.generate_header(
    time,
    signature,
    scheme: Stripe::Webhook::Signature::EXPECTED_SCHEME
  )
end
