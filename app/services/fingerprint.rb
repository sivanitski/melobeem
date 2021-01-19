class Fingerprint
  def self.call(request)
    {
      ip: request.remote_ip,
      vc: request.cookie_jar.signed[:vc]
    }
  end
end
