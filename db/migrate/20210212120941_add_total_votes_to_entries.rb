class AddTotalVotesToEntries < ActiveRecord::Migration[6.1]
  def up
    add_column :entries, :total_votes, :integer, null: false, default: 0
  end

  def down
    remove_column :entries, :total_votes, :integer
  end
end
