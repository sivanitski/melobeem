class ChangeNotifications < ActiveRecord::Migration[6.1]
  def up
    remove_column :notifications, :title
    remove_column :notifications, :status
    add_reference :notifications, :entry, foreign_key: true
    create_enum :notification_source_type, %w[unlock vote purchase bonus]
    add_column :notifications, :source_type, :notification_source_type
  end

  def down
    add_column :notifications, :title, :string
    add_column :notifications, :status, :string
    remove_reference :notifications, :entry
    remove_column :notifications, :source_type
    execute "DROP type notification_source_type;"
  end
end
