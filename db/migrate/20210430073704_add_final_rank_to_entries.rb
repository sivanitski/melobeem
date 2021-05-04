class AddFinalRankToEntries < ActiveRecord::Migration[6.1]
  def change
    add_column :entries, :final_rank, :integer, null: false, default: 0
  end
end
