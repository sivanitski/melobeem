module Users
  class EntriesSerializer < ::BaseSerializer
    attributes :id, :name, :image_url, :level

    def image_url
      image_path(object.image)
    end
  end
end
