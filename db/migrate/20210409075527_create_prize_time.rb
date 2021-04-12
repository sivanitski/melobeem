class CreatePrizeTime < ActiveRecord::Migration[6.1]
  def change
    create_table :prize_times do |t|
      t.integer :value, null: false
      t.references :entry, foreign_key: true
      t.timestamps
    end
  end
end
