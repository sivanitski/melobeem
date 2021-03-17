module Entries
  class BaseSerializer < ::BaseSerializer
    def username
      object.user.name
    end

    def image_url
      object.image.attached? ? object.image.imgproxy_url : ''
    end
  end
end
