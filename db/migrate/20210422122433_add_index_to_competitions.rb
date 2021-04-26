class AddIndexToCompetitions < ActiveRecord::Migration[6.1]
  def change
    add_index :competitions, :starts_at, unique: true
  end
end
