module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include API::CsrfCookie

    skip_before_action :authenticate

    def facebook
      @user = User.from_omniauth(auth)

      if @user.persisted?
        sign_in @user, event: :authentication
        render json: { user: @user }, status: :ok
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
