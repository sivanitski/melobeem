module API
  module V1
    class UsersController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: %i[show entries]

      def show
        render json: user, serializer: ::Users::ShowSerializer
      end

      def entries
        render json: user.entries, each_serializer: ::Users::EntriesSerializer
      end

      def friends
        respond_with_item_list(
          current_user.friends,
          ::Users::ShowSerializer
        )
      end

      private

      def user
        @user ||= User.find(params[:id])
      end
    end
  end
end
