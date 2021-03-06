module API
  module V1
    module Users
      class EntriesController < API::V1::ApplicationController
        def edit
          entry = current_user.entries.find(params[:id])

          respond_with entry, serializer: ::Entries::ShowSerializer
        end

        def update
          entry = ::Entries::WithRankQuery.new.call(Competition.current!.id).find_by!(id: params[:id], user_id: current_user.id)

          if entry.update(entries_params)
            render json: entry, serializer: ::Entries::RankedSerializer, country: country
          else
            render_fail_response(entry.errors)
          end
        end

        def destroy
          entry = current_user.entries.find(params[:id])

          if entry.destroy
            render json: entry, serializer: ::Entries::ShowSerializer
          else
            render_fail_response(entry.errors)
          end
        end

        private

        def entries_params
          params.require(:entry).permit(:name, :image, :total_votes)
        end
      end
    end
  end
end
