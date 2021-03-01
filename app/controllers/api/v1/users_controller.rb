module API
  module V1
    class UsersController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: :show
      before_action :set_user, only: :show

      def show
        render json: @user, serializer: ::Users::ShowSerializer
      end

      private

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
