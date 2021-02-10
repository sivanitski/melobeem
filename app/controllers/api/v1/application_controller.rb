module API
  module V1
    class ApplicationController < ActionController::Base
      include API::AuthMixins
      include API::NotFoundRescue
      include API::Pagination
      include API::ResponseHelper
      include ActiveStorage::SetCurrent

      before_action :authenticate_user!

      private

      def competition
        @competition ||= Competition.find(params[:competition_id])
      end
    end
  end
end
