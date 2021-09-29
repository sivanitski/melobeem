class CreateAwards < ActiveRecord::Migration[6.1]
  def change
    create_table :awards do |t|
      t.belongs_to :entry, foreign_key: true, index: true
      t.integer :award_type, default: 0, null: false
      t.integer :value
      t.boolean :is_secret, default: false
      t.boolean :claimed, default: false
      t.datetime :claimed_at

      t.timestamps
    end
  end
end
