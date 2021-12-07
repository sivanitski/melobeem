module API
  module V1
    module Entries
      class CommentsController < API::V1::ApplicationController
        protect_from_forgery with: :null_session
        skip_before_action :authenticate_user!, only: %i[index load_child_comments]

        def index # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
          entry = Entry.find(params[:entry_id])

          comments = Comments::ListQuery.new.call(
            entry_id: params[:entry_id],
            page: params[:page],
            per: params[:per]
          )

          render json: comments,
                 each_serializer: ::Comments::IndexSerializer,
                 root: :comments,
                 meta: {
                   per: params[:per],
                   page: params[:page],
                   total_count: entry.comments.main.count
                 }
        end

        def load_child_comments
          entry = Entry.find(params[:entry_id])

          comments = entry.comments.where(parent_id: params[:id]).order(created_at: :desc)

          respond_with_item_list(comments, ::Comments::ShowSerializer)
        end

        def create
          entry = Entry.find(params[:entry_id])

          comment = entry.comments.new(comment_params)

          if comment.save
            render json: comment, serializer: ::Comments::ShowSerializer
          else
            render_fail_response(comment.errors.full_messages.first)
          end
        end

        def destroy
          comment = current_user.comments.find_by(id: params[:id])

          if comment.destroy
            render json: comment, serializer: ::Comments::ShowSerializer
          else
            render_fail_response(comment.errors.full_messages.first)
          end
        end

        def report_comment
          entry = Entry.find(params[:entry_id])
          comment = entry.comments.find_by(id: params[:id])

          if comment.update(is_reported: true)
            render json: comment, serializer: ::Comments::ShowSerializer
          else
            render_fail_response(comment.errors.full_messages.first)
          end
        end

        private

        def comment_params
          params[:comment][:user_id] = current_user.id if params[:comment].present?
          params.require(:comment).permit(:body, :parent_id, :user_id)
        end
      end
    end
  end
end
