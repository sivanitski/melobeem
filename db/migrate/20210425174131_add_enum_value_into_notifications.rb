class AddEnumValueIntoNotifications < ActiveRecord::Migration[6.1]
  def up
    add_enum_value :notification_source_type, "invitation"
  end

  def down
    remove_enum_value :notification_source_type, "invitation"
  end
end
