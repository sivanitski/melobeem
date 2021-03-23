module API
  module V1
    class CompetitionsController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: %i[current previous_winners]

      def current
        render json: competition, serializer: Competitions::CurrentSerializer
      end

      def previous_winners
        respond_with_item_list(
          Competitions::PreviousWinnersQuery.new.call,
          ::Competitions::PreviousWinnersSerializer
        )
      end
    end
  end
end
