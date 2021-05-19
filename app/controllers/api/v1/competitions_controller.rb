module API
  module V1
    class CompetitionsController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: %i[current previous_winners competition_prizes previous_awarded]

      def current
        render json: competition, serializer: Competitions::CurrentSerializer
      end

      def previous_winners
        respond_with_item_list(
          Competitions::PreviousWinnersQuery.new.call,
          ::Competitions::PreviousWinnersSerializer
        )
      end

      def competition_prizes
        render json: Competitions::PrizesQuery.new(competition).call, serializer: nil, status: :ok
      end

      def previous_awarded
        respond_with_item_list(
          Entry.where(competition_id: params[:id]).where('final_rank <= ?', 100),
          ::Competitions::PreviousAwardedSerializer
        )
      end
    end
  end
end
