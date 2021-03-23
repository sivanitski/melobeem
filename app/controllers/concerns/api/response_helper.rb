module API
  module ResponseHelper
    extend ActiveSupport::Concern

    included do
      respond_to :json

      def render_fail_response(message, status = 422)
        render json: { success: false, message: message }, status: status
      end

      def respond_with_item_list(items, serializer, options = {})
        respond_with items.page(page_number).per(per_page),
                     each_serializer: serializer,
                     meta: { per: per_page, page: page_number, total_count: items.size }.merge(options)
      end
    end
  end
end
