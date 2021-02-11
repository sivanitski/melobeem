class AddNameToEntries < ActiveRecord::Migration[6.1]
  def up
    add_column :entries, :name, :string
    change_column_null :entries, :name, false, ''
  end

  def down
    remove_column :entries, :name, :string
  end
end
