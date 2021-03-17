module Users
  class BaseSerializer < ::BaseSerializer
    def avatar_url
      object.avatar.attached? ? object.avatar.imgproxy_url : ''
    end
  end
end
