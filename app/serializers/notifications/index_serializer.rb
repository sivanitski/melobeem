module Notifications
  class IndexSerializer < ::BaseSerializer
    attributes :id, :user_id, :text, :source_type, :image_url, :created_at_date

    def created_at_date
      object.created_at.to_date
    end

    def image_url
      case object.source_type
      when 'vote'
        image_path(object.entry.image)
      when 'unlock', 'purchase', 'bonus'
        ''
      end
    end
  end
end
