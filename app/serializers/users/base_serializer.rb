module Users
  class BaseSerializer < ::BaseSerializer
    def avatar_url
      image_path(object.avatar)
    end
  end
end
