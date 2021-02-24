module Entries
  class SearchSerializer < BaseSerializer
    attributes :id, :name, :image_url, :total_votes, :username

    def username
      object.user.name
    end

    def image_url
      object.image.attached? ? rails_blob_url(object.image) : ''
    end
  end
end
