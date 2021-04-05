class AddPayloadToNotifications < ActiveRecord::Migration[6.1]
  def up
    remove_column :notifications, :text
    add_column :notifications, :payload, :jsonb, null: false, default: {}
  end

  def down
    remove_column :notifications, :payload
    add_column :notifications, :text, :string
  end
end
