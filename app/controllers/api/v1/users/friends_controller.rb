module API
  module V1
    module Users
      class FriendsController < API::V1::ApplicationController
        def index
          respond_with_item_list(
            current_user.friends,
            ::Users::ShowSerializer
          )
        end

        def add_friend
          user = User.find(params[:user_id])

          if current_user.friends.exists?(id: user.id)
            render_fail_response('User and you are already friends')
          else
            current_user.friends << user

            render json: user, serializer: ::Users::ShowSerializer
          end
        end
      end
    end
  end
end
