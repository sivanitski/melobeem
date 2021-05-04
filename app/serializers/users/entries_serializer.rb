module Users
  class EntriesSerializer < ::BaseSerializer
    attributes :id, :name, :image_url, :level, :current_competition

    def image_url
      image_path(object.image)
    end

    def current_competition
      object.competition == Competition.current!
    end
  end
end
