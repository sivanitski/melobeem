class AddDeactivatedToUsersAndEntries < ActiveRecord::Migration[6.1]
  def up
    add_column :users, :deactivated, :boolean, null: false, default: false
    add_column :entries, :deactivated, :boolean, null: false, default: false
  end

  def down
    remove_column :users, :deactivated, :boolean
    remove_column :entries, :deactivated, :boolean
  end
end
