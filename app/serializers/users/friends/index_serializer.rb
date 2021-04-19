module Users
  module Friends
    class IndexSerializer < Users::BaseSerializer
      attributes :id, :name, :avatar_url, :source_type
    end
  end
end
