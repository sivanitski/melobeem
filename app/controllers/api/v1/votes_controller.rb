module Api
  module V1
    class VotesController < ApplicationController
      before_action :make_fingerprint

      def create
        result = Votes::Create.new.call(params: vote_params.merge(fingerprint: @fingerprint))
        case result
        when Success
          render json: result.value, status: :created
        else
          render json: { errors: result.error }, status: :unprocessable_entity
        end
      end

      private

      def vote_params
        params.require(:vote).permit(:entry_id, :value, :user_id)
      end

      def make_fingerprint
        @fingerprint = Fingerprint.call(request)
      end
    end
  end
end
