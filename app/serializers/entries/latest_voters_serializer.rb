module Entries
  class LatestVotersSerializer < ::BaseSerializer
    attributes :id, :name, :avatar_url

    def avatar_url
      object.avatar.attached? ? object.avatar.imgproxy_url : ''
    end
  end
end
