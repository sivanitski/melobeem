module API
  module V1
    module Entries
      class VotesController < API::V1::ApplicationController
        before_action :set_entry, only: :expiration_time_for_free
        before_action :make_fingerprint, only: :create_free

        def expiration_time_for_free
          uniq_key = [@entry.id, current_user.id].join(':')
          ttl = [0, Redis.current.ttl(uniq_key)].max

          render json: { ttl_in_seconds: ttl }
        end

        def create_free
          result = Votes::Create.new.call(params: vote_params.merge(fingerprint: @fingerprint))

          case result
          when Success
            render json: result.value, status: :created
          else
            render json: { message: result.error }, status: :unprocessable_entity
          end
        end

        private

        def set_entry
          @entry = @competition.entries.find(params[:entry_id])
        end

        def vote_params
          params.permit(:entry_id, :value, :user_id)
        end

        def make_fingerprint
          @fingerprint = Fingerprint.call(request)
        end
      end
    end
  end
end