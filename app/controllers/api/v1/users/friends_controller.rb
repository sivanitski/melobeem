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
          friends = case params[:source_type]
                    when 'external' then current_user.external_friends
                    when 'internal' then current_user.internal_friends
                    else current_user.friends
                    end.with_attached_avatar

          Friendships::WithCurrentBabyQuery.new.call(friends)
        end
      end
    end
  end
end
