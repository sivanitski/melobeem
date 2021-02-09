module Entries
  class LatestVotersSerializer < ActiveModel::Serializer
    attributes :id, :name, :avatar_url

    def avatar_url
      object.avatar.present? ? object.avatar.url : ''
    end
  end
end
