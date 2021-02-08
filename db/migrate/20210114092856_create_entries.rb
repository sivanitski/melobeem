class CreateEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :entries do |t|
      t.integer :gender, null: false
      t.references :user, foreign_key: true
      t.references :competition, foreign_key: true
      t.timestamps
    end

    add_index :entries, %i[user_id competition_id], unique: true
  end
end
