module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include API::CsrfCookie

    skip_before_action :authenticate

    after_filter :set_access_control_headers

    def set_access_control_headers
      headers['Access-Control-Allow-Origin'] = ''
      headers['Access-Control-Request-Method'] = ''
    end

    def facebook
      @user = Users::FromOmniauth.new(auth: auth).call

      if @user.persisted?
        sign_in @user, event: :authentication
        render json: @user, serializer: Users::ShowSerializer
      else
        render json: { errors: @user.errors, auth: auth.except(:extra) }, status: :bad_request
      end
    end

    private

    def auth
      request.env['omniauth.auth']
    end
  end
end
