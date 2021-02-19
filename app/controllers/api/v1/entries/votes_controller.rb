module API
  module V1
    module Entries
      class VotesController < API::V1::ApplicationController
        before_action :set_entry, only: :expiration_time_for_free

        def expiration_time_for_free
          uniq_key = [@entry.id, current_user.id].join(':')
          ttl = [0, Redis.current.ttl(uniq_key)].max

          render json: { ttl_in_seconds: ttl }
        end

        private

        def set_entry
          @entry = @competition.entries.find(params[:entry_id])
        end
      end
    end
  end
end
