class CreateEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :entries do |t|
      t.integer :gender, null: false
      t.references :competition, foreign_key: true
      t.timestamps
    end
  end
end
