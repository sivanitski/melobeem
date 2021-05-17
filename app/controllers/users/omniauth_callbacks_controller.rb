module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include API::CsrfCookie

    def facebook
      @user = Users::FromOmniauth.new(auth: auth).call

      if @user.persisted?
        check_reference

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

    def check_reference
      return if cookies[:ref].blank?

      referrer = User.find_by(id: cookies[:ref])
      return if referrer.blank?

      Users::Friendships::CreateFromReference.new(user: @user, referrer: referrer).call
      cookies[:ref] = nil
    end
  end
end
