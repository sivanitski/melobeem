module API
  module V1
    class ApplicationController < ActionController::Base
      include API::ErrorHandling
      include API::Pagination
      include API::ResponseHelper

      before_action :authenticate_user!
      before_action :set_competition

      private

      def set_competition
        @competition = Competition.current!
      end
    end
  end
end
