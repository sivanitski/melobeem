module API
  module V1
    module Auth
      class SessionsController < DeviseTokenAuth::SessionsController
        include API::AuthMixins
      end
    end
  end
end
