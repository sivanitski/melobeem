module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include API::CsrfCookie

    def facebook
      @user = Users::FromOmniauth.new(auth: auth, remote_ip: remote_ip).call

      if @user.persisted?
        check_reference

        sign_in @user, event: :authentication

        check_state
      else
        render json: { errors: @user.errors, auth: auth.except(:extra) }, status: :bad_request
      end
    end

    private

    def auth
      request.env['omniauth.auth']
    end

    def remote_ip
      request.remote_ip
    end

    def check_state
      case params[:state]
      when 'login'
        redirect_to root_path
      when 'entry_create'
        redirect_to '/sign-up'
      else
        return redirect_to params[:state] if params[:state]&.include?('/entry/')

        redirect_to root_path
      end
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
