module Entries
  class LatestVotersSerializer < Entries::BaseSerializer
    attributes :id, :name, :avatar_url

    def avatar_url
      object.avatar.attached? ? rails_blob_url(object.avatar) : ''
    end
  end
end