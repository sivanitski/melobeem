def generate_stripe_signature(payload)
  time = Time.zone.now
  secret = ENV.fetch('STRIPE_ENDPOINT_SECRET')
  signature = Stripe::Webhook::Signature.compute_signature(time, payload, secret)
  Stripe::Webhook::Signature.generate_header(
    time,
    signature,
    scheme: Stripe::Webhook::Signature::EXPECTED_SCHEME
  )
end
