module API
  module V1
    class ProductsController < API::V1::ApplicationController
      def index
        products = Product.all

        products = products.where(product_type: params[:product_type]) if params[:product_type].present?

        respond_with_item_list(products, Products::IndexSerializer)
      end
    end
  end
end
