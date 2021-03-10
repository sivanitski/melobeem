module API
  module V1
    class ApplicationController < ActionController::Base
      include API::CsrfCookie
      include API::ErrorHandling
      include API::Pagination
      include API::ResponseHelper

      before_action :authenticate_user!

      private

      def competition
        @competition ||= Competition.current!
      end
    end
  end
end
