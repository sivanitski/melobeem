module API
  DEFAULT_COUNTRY = 'US'.freeze

  module V1
    class ApplicationController < ActionController::Base
      include API::CsrfCookie
      include API::ErrorHandling
      include API::Pagination
      include API::ResponseHelper
      include API::GeoIp
      include API::LocalizeProducts

      before_action :authenticate_user!

      private

      def competition
        @competition ||= Competition.current!
      end
    end
  end
end
