module API
  module V1
    class NotificationsController < API::V1::ApplicationController
      after_action :read_notifications, only: :index

      def index
        @notifications = current_user.notifications.order(created_at: :desc)

        respond_with_item_list(
          @notifications,
          ::Notifications::IndexSerializer
        )
      end

      def unread_present
        render json: {
          unread_present: current_user.notifications.where(read: false).limit(1).present?
        }, status: :ok
      end

      private

      def read_notifications
        @notifications.where(read: false).update_all(read: true) # rubocop:disable Rails/SkipsModelValidations
      end
    end
  end
end
