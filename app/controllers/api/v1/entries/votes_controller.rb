module API
  module V1
    module Entries
      class VotesController < API::V1::ApplicationController
        def expiration_time_for_free
          uniq_key = [current_user.id, entry.id].join(':')
          ttl = [0, Redis.current.ttl(uniq_key)].max

          render json: { ttl_in_seconds: ttl }
        end

        def create_free
          result = Votes::Create.new.call(params: vote_params.merge(fingerprint: fingerprint))

          case result
          when Success
            render json: result.value, status: :created
          else
            render json: { message: result.error }, status: :unprocessable_entity
          end
        end

        private

        def entry
          @entry ||= competition.entries.find(params[:entry_id])
        end

        def vote_params
          params.permit(:entry_id, :value, :user_id)
        end

        def fingerprint
          @fingerprint ||= Fingerprint.call(request)
        end
      end
    end
  end
end
