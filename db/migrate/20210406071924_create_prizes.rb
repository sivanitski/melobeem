class CreatePrizes < ActiveRecord::Migration[6.1]
  def up
    create_table :prizes do |t|
      t.integer :level, null: false, default: 1
      t.boolean :spent, null: false, default: false
      t.references :entry, foreign_key: true
      t.integer :value
      t.timestamps
    end

    add_check_constraint :prizes, 'value IN (1, 5, 10, 20, 30)'
    create_enum :prize_source_type, %w[vote spin min]
    add_column :prizes, :source_type, :prize_source_type
  end

  def down
    drop_table :prizes
    execute "DROP type prize_source_type;"
  end
end
