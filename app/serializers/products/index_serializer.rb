module Products
  class IndexSerializer < ::BaseSerializer
    attributes :id, :title, :price, :previous_price, :value, :image_url

    def image_url
      image_path(object.image)
    end

    def price
      return object.price if event.blank?

      event.blank? ? object.price : object.discounted_price
    end

    def previous_price
      return nil if event.blank?

      object.price
    end

    private

    def event
      @event ||= Event.today
    end
  end
end
