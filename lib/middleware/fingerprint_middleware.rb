class FingerprintMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)
    request.cookie_jar.permanent.signed[:vc] ||= SecureRandom.hex(32)
    @app.call(env)
  end
end
