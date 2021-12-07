module Comments
  class ShowSerializer < ::BaseSerializer
    attributes :id, :entry_id, :user_id, :user_name, :user_avatar,
               :body, :parent_id, :created_at, :is_reported

    def user_name
      object.user.name
    end

    def user_id
      object.user.id
    end

    def user_avatar
      image_path(object.user.avatar)
    end
  end
end
