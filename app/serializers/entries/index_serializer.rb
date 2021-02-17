module Entries
  class IndexSerializer < BaseSerializer
    attributes :id, :gender, :name, :image_url, :total_votes

    def image_url
      object.image.attached? ? rails_blob_url(object.image) : ''
    end
  end
end
