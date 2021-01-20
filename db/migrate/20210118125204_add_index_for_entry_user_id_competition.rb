class AddIndexForEntryUserIdCompetition < ActiveRecord::Migration[6.1]
  def change
    add_index :entries, %i[user_id competition_id], unique: true
  end
end
