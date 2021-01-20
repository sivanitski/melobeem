module API
  module Pagination
    extend ActiveSupport::Concern

    PER_PAGE = 20
    PAGE_NUMBER = 1

    included do
      def per_page
        @per_page ||= params[:per].present? ? correct_per_page : PER_PAGE
      end

      def correct_per_page
        params[:per].to_i > 50 ? 50 : params[:per].to_i
      end

      def page_number
        @page_number ||= params[:page] || PAGE_NUMBER
      end
    end
  end
end
