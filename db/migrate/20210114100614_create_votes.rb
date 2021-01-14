class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :value, null: false, default: 0
      t.references :entry, foreign_key: true
      t.timestamps
    end
  end
end
