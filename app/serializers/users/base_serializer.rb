module Users
  class BaseSerializer < ::BaseSerializer
    def avatar_url
      object.avatar.attached? ? rails_blob_url(object.avatar) : ''
    end
  end
end
