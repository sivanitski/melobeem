module API
  module V1
    class UsersController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: %i[show entries]

      def show
        render json: user, serializer: ::Users::ShowSerializer
      end

      def entries
        render json: user.entries.order(created_at: :desc), each_serializer: ::Users::EntriesSerializer
      end

      def current
        render json: current_user, serializer: ::Users::ShowSerializer
      end

      def deactivate
        ::Users::Deactivate.new(current_user).call
        sign_out current_user
      end

      def previous_entries
        render json: user.entries.where.not(competition: Competition.current!), each_serializer: ::Users::EntriesSerializer
      end

      def show_share_modal
        render json: current_user.votes.where(created_at: Date.current.all_day, source_type: 'user').empty?, adapter: nil, status: :ok
      end

      def take_additional_prize
        prize = entry.competition_additional_prize

        if prize.zero?
          render json: { prize: nil }, status: :ok
        else
          ::Users::TakePrizeAndSendNotification.new.call(prize: prize, entry: entry)
          render json: { prize: prize }, adapter: nil, status: :ok
        end
      end

      private

      def user
        @user ||= User.find(params[:id])
      end

      def entry
        @entry ||= current_user.entries.find(params[:entry_id])
      end
    end
  end
end
