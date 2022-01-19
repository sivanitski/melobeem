class AddClickIdToEntries < ActiveRecord::Migration[6.1]
  def change
    add_column :entries, :freebies_click_id, :string
  end
end
