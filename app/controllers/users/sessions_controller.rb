module Users
  class SessionsController < Devise::SessionsController
    include API::CsrfCookie
  end
end
