module API
  module V1
    class LeaderboardController < ApplicationController
      skip_before_action :authenticate_api_v1_user!, only: :index

      def index
        items = Leaderboard::Actions.get_collection(params[:page], params[:per], with_details: true)

        render json: {
          entries: items,
          meta: { total_count: items.size, page: params[:page], per: params[:per] }
        }
      end
    end
  end
end
