module API
  module V1
    class EventsController < API::V1::ApplicationController
      def current
        @event = Event.today

        respond_with @event, serializer: Events::ShowSerializer
      end

      def show_event_modal
        if current_user.present? && current_user.last_time_see_sales_at&.to_date != Time.zone.today
          @event = Event.today
          current_user.update(last_time_see_sales_at: Time.current)
        end

        if @event.present?
          respond_with @event, serializer: Events::ShowSerializer
        else
          render json: { success: false, message: 'no events today' }
        end
      end
    end
  end
end
