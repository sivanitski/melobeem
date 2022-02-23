module Entries
  class BaseSerializer < ::BaseSerializer
    def username
      object.user.name
    end

    def image_url
      image_path(object.image)
    end
  end
end
