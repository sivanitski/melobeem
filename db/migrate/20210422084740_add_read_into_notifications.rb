class AddReadIntoNotifications < ActiveRecord::Migration[6.1]
  def change
    add_column :notifications, :read, :boolean, default: false

    add_index :notifications, :read
  end
end
