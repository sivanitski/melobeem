module Notifications
  class IndexSerializer < ::BaseSerializer
    attributes :id, :user_id, :title, :text, :status, :created_at_date

    def created_at_date
      object.created_at.to_date
    end
  end
end
