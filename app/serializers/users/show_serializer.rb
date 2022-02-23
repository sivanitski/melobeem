module Users
  class ShowSerializer < Users::BaseSerializer
    attributes :id, :name, :avatar_url
  end
end
