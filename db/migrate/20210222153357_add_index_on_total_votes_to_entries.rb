class AddIndexOnTotalVotesToEntries < ActiveRecord::Migration[6.1]
  def change
    add_index(:entries, :total_votes)
  end
end
