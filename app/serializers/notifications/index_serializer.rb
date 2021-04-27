module Notifications
  class IndexSerializer < ::BaseSerializer
    attributes :id, :user_id, :entry_id, :entry_name, :image_url,
               :payload, :source_type, :created_at_date, :read

    def created_at_date
      object.created_at.to_date
    end

    def image_url
      case object.source_type
      when 'vote'
        image_path(object.entry.image)
      when 'unlock', 'purchase', 'bonus'
        ''
      when 'invitation'
        image_path(object.user.avatar)
      end
    end

    def entry_id
      object.entry&.id
    end

    def entry_name
      object.entry&.name
    end
  end
end
