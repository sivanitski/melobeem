module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include API::CsrfCookie

    skip_before_action :authenticate

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
