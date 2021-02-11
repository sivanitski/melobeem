module Entries
  class IndexSerializer < ActiveModel::Serializer
    attributes :id, :gender, :name, :image_url

    def image_url
      object.image.present? ? object.image.url : ''
    end
  end
end
