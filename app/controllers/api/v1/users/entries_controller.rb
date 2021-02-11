module API
  module V1
    module Users
      class EntriesController < API::V1::ApplicationController
        def edit
          entry = current_user.entries.find(params[:id])

          respond_with entry, serializer: Entries::ShowSerializer
        end

        def update
          entry = current_user.entries.find(params[:id])

          if entry.update(entries_params)
            render json: entry, serializer: Entries::ShowSerializer
          else
            render_fail_response(entry.errors)
          end
        end

        def destroy
          entry = current_user.entries.find(params[:id])

          if entry.delete
            render json: entry, serializer: Entries::ShowSerializer
          else
            render_fail_response(entry.errors)
          end
        end

        private

        def entries_params
          params.require(:entry).permit(:gender, :name, :image)
        end
      end
    end
  end
end
