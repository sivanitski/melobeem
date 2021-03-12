module Entries
  class CurrentSerializer < Entries::BaseSerializer
    attributes :id, :image_url, :name, :level
  end
end
