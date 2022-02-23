module API
  module V1
    class NotificationsController < API::V1::ApplicationController
      def index
        notifications = current_user.notifications.order(created_at: :desc)
        respond_with_item_list(
          notifications,
          ::Notifications::IndexSerializer
        )
      end
    end
  end
end
