module API
  module V1
    module Users
      class FriendsController < API::V1::ApplicationController
        def index
          respond_with_item_list(friends, ::Users::Friends::IndexSerializer)
        end

        def add_friend
          user = User.find(params[:user_id])

          if current_user.friends.exists?(id: user.id)
            render_fail_response('User and you are already friends')
          else
            current_user.internal_friends << user

            render json: user, serializer: ::Users::ShowSerializer
          end
        end

        private

        def friends
          return current_user.external_friends if params[:source_type].eql?('external')
          return current_user.internal_friends if params[:source_type].eql?('internal')

          current_user.friends
        end
      end
    end
  end
end
