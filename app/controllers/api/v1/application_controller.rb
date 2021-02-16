module API
  module V1
    class ApplicationController < ActionController::Base
      include API::AuthMixins
      include API::NotFoundRescue
      include API::Pagination
      include API::ResponseHelper

      before_action :authenticate_user!
      before_action :set_competition

      private

      def set_competition
        @competition = Competition.order(created_at: :desc).take!
      end
    end
  end
end
