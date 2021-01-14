module Api
  module V1
    class VotesController < ApplicationController
      def create
        return Redis.current.ttl(@uniq_key) if Redis.current.exists(@uniq_key)

        @vote = Vote.new(vote_params)

        if @vote.save
          create_uniq_vote_key
          render json: @vote, status: :created
        else
          render json: { errors: @vote.errors }, status: :unprocessable_entity
        end
      end

      private

      def vote_params
        params.require(:vote).permit(:entry_id, :value, :user_id)
      end

      def create_uniq_vote_key
        @uniq_key = (User.find(params[:vote][:user_id]).email + params[:vote][:entry_id].to_s)
        Redis.current.psetex(@uniq_key, 600_000, @uniq_key)
      end
    end
  end
end
