module API
  module V1
    class CompetitionsController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: :current

      def current
        render json: @competition, serializer: Competitions::CurrentSerializer
      end
    end
  end
end
