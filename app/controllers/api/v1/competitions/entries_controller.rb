module API
  module V1
    module Competitions
      class EntriesController < API::V1::ApplicationController
        skip_before_action :authenticate_api_v1_user!, except: %i[create]

        def index
          respond_with_item_list(competition.entries, Entries::IndexSerializer)
        end

        def show
          entry = competition.entries.find(params[:id])

          respond_with entry, serializer: Entries::ShowSerializer
        end

        def create
          entry = competition.entries.new(entries_params.merge(user: current_user))

          if entry.save
            render json: entry, serializer: Entries::ShowSerializer
          else
            render_fail_response(entry.errors)
          end
        end

        private

        def entries_params
          params.require(:entry).permit(:gender)
        end
      end
    end
  end
end
