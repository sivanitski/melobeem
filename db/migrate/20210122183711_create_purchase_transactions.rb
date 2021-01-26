class CreatePurchaseTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :purchase_transactions do |t|
      t.string :intent_id
      t.integer :amount
      t.integer :amount_received
      t.integer :vote_value
      t.integer :status, default: 0
      t.jsonb :full_info, default: {}, null: false
      t.references :user, foreign_key: true
      t.references :entry, foreign_key: true

      t.timestamps
    end
  end
end
