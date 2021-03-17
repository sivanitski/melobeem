module Users
  class EntriesSerializer < ::BaseSerializer
    attributes :id, :name, :image_url, :level

    def image_url
      object.image.attached? ? object.image.imgproxy_url : ''
    end
  end
end
