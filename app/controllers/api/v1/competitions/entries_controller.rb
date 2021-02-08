module API
  module V1
    module Competitions
      class EntriesController < API::V1::ApplicationController
        skip_before_action :authenticate_api_v1_user!, except: %i[create]
        before_action :find_entry, only: %i[show latest_voters]

        def index
          respond_with_item_list(competition.entries, Entries::IndexSerializer)
        end

        def show
          respond_with @entry, serializer: Entries::ShowSerializer
        end

        def create
          entry = competition.entries.new(entries_params.merge(user: current_user))

          if entry.save
            render json: entry, serializer: Entries::ShowSerializer
          else
            render_fail_response(entry.errors)
          end
        end

        def latest_voters
          users = User.select('*')
                      .from(User.joins(:votes)
                                .select('distinct on (users.id) users.*, votes.created_at as vote_created_at')
                                .where(votes: { entry: @entry })
                                .order('users.id, votes.created_at desc')).order('vote_created_at desc').limit(10)

          if users.any?
            render json: users, each_serializer: Entries::LatestVotersSerializer
          else
            render json: { message: 'No voted' }, status: :not_found
          end
        end

        private

        def entries_params
          params.require(:entry).permit(:gender, :image)
        end

        def find_entry
          @entry = competition.entries.find(params[:id])
        end
      end
    end
  end
end
