class RemoveGenderFromEntries < ActiveRecord::Migration[6.1]
  def up
    remove_column :entries, :gender
  end

  def down
    add_column :entries, :gender, :integer
  end
end
