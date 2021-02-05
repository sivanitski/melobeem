class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :value, null: false, default: 1
      t.jsonb :fingerprint, null: false, default: {}
      t.references :user, foreign_key: true
      t.references :entry, foreign_key: true
      t.timestamps
    end
  end
end
