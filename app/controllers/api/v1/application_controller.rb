module API
  module V1
    class ApplicationController < ActionController::Base
      include DeviseTokenAuth::Concerns::SetUserByToken
      include API::AuthMixins
      include API::NotFoundRescue
      include API::Pagination
      include API::ResponseHelper

      alias current_user current_api_v1_user

      before_action :authenticate_api_v1_user!

      private

      def competition
        @competition ||= Competition.find(params[:competition_id])
      end
    end
  end
end
