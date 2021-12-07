module Comments
  class IndexSerializer < ::BaseSerializer
    attributes :id, :entry_id, :user_id, :user_name, :user_avatar, :body, :parent_id, :replies, :created_at

    def user_id
      object.user.id
    end

    def user_name
      object.user.name
    end

    def user_avatar
      image_path(object.user.avatar)
    end

    def replies # rubocop:disable Metrics/MethodLength
      data = object.comment_replies.map do |reply|
        next if reply['user_id'].blank?

        {
          id: reply['id'],
          entry_id: reply['entry_id'],
          body: reply['body'],
          parent_id: reply['parent_id'],
          created_at: reply['created_at']
        }.merge(user_data(reply))
      end

      return nil if data.compact.blank?

      data
    end

    def user_data(reply)
      user = User.find(reply['user_id'])

      {
        user_id: user.id,
        user_name: user.name,
        user_avatar: image_path(user.avatar)
      }
    end
  end
end
