module Users
  class EntriesSerializer < ::BaseSerializer
    attributes :id, :name, :image_url, :level, :current

    def image_url
      image_path(object.image)
    end

    def current
      object.competition == Competition.current!
    end
  end
end
