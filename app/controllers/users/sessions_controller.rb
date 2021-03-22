module Users
  class SessionsController < Devise::SessionsController
    include API::CsrfCookie
    skip_before_action :authenticate
  end
end
