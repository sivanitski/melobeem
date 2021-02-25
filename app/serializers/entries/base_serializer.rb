module Entries
  class BaseSerializer < ::BaseSerializer
    def username
      object.user.name
    end

    def image_url
      object.image.attached? ? rails_blob_url(object.image) : ''
    end
  end
end
