class CreateSpins < ActiveRecord::Migration[6.1]
  def change
    create_table :spins do |t|
      t.boolean :paid, null: false, default: false
      t.integer :value, null: false, default: 0
      t.references :user, foreign_key:true
      t.timestamps
    end
  end
end
