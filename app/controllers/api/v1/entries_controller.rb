module API
  module V1
    class EntriesController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, except: %i[create current]
      before_action :set_entry, only: %i[show latest_voters]

      def index
        respond_with_item_list(@competition.entries.with_attached_image, Entries::IndexSerializer)
      end

      def show
        respond_with @entry, serializer: Entries::ShowSerializer
      end

      def create
        entry = @competition.entries.new(entries_params.merge(user: current_user))

        if entry.save
          render json: entry, serializer: Entries::ShowSerializer
        else
          render_fail_response(entry.errors)
        end
      end

      def latest_voters
        users = Entries::LatestVotersQuery.new.call(@entry)

        if users.any?
          render json: users, each_serializer: Entries::LatestVotersSerializer
        else
          render json: { message: 'No voted' }, status: :not_found
        end
      end

      def current
        render json: @competition.entries.find_by!(user: current_user), serializer: Entries::CurrentSerializer
      end

      private

      def entries_params
        params.require(:entry).permit(:gender, :name, :image)
      end

      def set_entry
        @entry = @competition.entries.find(params[:id])
      end
    end
  end
end
