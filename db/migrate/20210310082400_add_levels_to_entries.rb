class AddLevelsToEntries < ActiveRecord::Migration[6.1]
  def up
    add_column :entries, :level, :integer, null: false, default: 1
  end

  def down
    remove_column :entries, :level, :integer
  end
end
