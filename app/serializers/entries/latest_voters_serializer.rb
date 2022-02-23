module Entries
  class LatestVotersSerializer < ::BaseSerializer
    attributes :id, :name, :avatar_url

    def avatar_url
      image_path(object.avatar)
    end
  end
end
