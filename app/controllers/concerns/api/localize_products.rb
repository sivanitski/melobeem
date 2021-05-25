module API
  module LocalizeProducts
    extend ActiveSupport::Concern

    included do
      before_action :localize_products

      def localize_products
        Product.country = country.alpha2 || DEFAULT_COUNTRY
      end
    end
  end
end
