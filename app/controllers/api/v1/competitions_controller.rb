module API
  module V1
    class CompetitionsController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, only: %i[current previous_winners]

      def current
        render json: competition, serializer: Competitions::CurrentSerializer
      end

      def previous_winners
        winners = ::Competitions::PreviousWinnersQuery.new.call
        win_ids = winners.map {|w| w.winner_id}
        entry_images = Entry.with_attached_image.select('id').where(id: win_ids)
        render json: winners, each_serializer: ::Competitions::PreviousWinnersSerializer, entry_images: entry_images
      end
    end
  end
end
