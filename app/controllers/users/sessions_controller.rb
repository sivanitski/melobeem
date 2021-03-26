module Users
  class SessionsController < Devise::SessionsController
    include API::CsrfCookie
    skip_before_action :authenticate

    def create
      @graph = Koala::Facebook::API.new(params[:access_token], ENV["FACEBOOK_APP_SECRET"])
      user = @graph.get_object("me?fields=email,id,name,picture.type(large)")
      info = OpenStruct.new( email: user['email'], name: user['name'], image: user.dig("picture", "data", "url"))
      auth = OpenStruct.new(provider: 'facebook', uid: user['id'], info: info)

      @user = Users::FromOmniauth.new(auth: auth).call

      if @user.persisted?
        sign_in @user, event: :authentication
        render json: @user, serializer: Users::ShowSerializer
      else
        render json: { errors: @user.errors, auth: auth.except(:extra) }, status: :bad_request
      end
    end
  end
end
