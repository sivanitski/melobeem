module API
  module V1
    class AwardsController < API::V1::ApplicationController
      def index
        @awards = params[:all].present? ? current_user.awards.not_claimed : current_user.awards.not_claimed_public

        render json: @awards, each_serializer: ::Awards::IndexSerializer
      end

      def show
        award = current_user.awards.not_claimed.find(params[:id])

        render json: award, serializer: ::Awards::IndexSerializer
      end

      def take_prize
        entry = current_user.entries.order(created_at: :desc).first
        award = current_user.awards.find(params[:id])

        ::Users::TakeAward.new(award, entry).call

        render json: { success: true, entry_id: entry.id, award_type: award.award_type }, adapter: nil, status: :ok
      end
    end
  end
end
