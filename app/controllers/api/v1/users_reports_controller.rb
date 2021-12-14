module API
  module V1
    class UsersReportsController < API::V1::ApplicationController
      protect_from_forgery with: :null_session

      def create
        report = UsersReport.new(user_report_params)

        if report.save
          render json: report, serializer: ::UsersReports::ShowSerializer
        else
          render_fail_response(report.errors.full_messages.first)
        end
      end

      def list_of_types
        report_types = UsersReport.report_types

        report_types = report_types.to_a.map { |report_type| prepare_report(report_type) }

        render json: report_types
      end

      private

      def user_report_params
        params[:users_report][:user_id] = current_user.id if params[:users_report].present?

        params.require(:users_report).permit(:report_type, :details, :user_id, :target_id, :target_type)
      end

      def prepare_report(report_type)
        case report_type.last
        when 0
          { text: 'It’s inappropriate', id: 0 }
        when 1
          { text: 'Spam', id: 1 }
        when 2
          { text: 'Hate speech', id: 2 }
        when 3
          { text: 'It’s harassing me', id: 3 }
        end
      end
    end
  end
end
