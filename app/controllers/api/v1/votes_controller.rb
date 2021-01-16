module Api
  module V1
    class VotesController < ApplicationController
      def create
        result = CreateVote.call(params: vote_params)
        if result.success?
          render json: result.vote, serializer: VoteSerializer, status: :created
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      private

      def vote_params
        params.require(:vote).permit(:entry_id, :value, :user_id)
      end
    end
  end
end
