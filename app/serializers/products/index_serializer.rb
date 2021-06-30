module Products
  class IndexSerializer < ::BaseSerializer
    attributes :id, :title, :price, :value, :image_url

    def image_url
      image_path(object.image)
    end
  end
end
