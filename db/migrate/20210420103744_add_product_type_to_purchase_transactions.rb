class AddProductTypeToPurchaseTransactions < ActiveRecord::Migration[6.1]
  def up
    create_enum :product_type, %w[vote spin]
    add_column :purchase_transactions, :product_type, :product_type
  end

  def down
    remove_column :purchase_transactions, :product_type
    execute "DROP type product_type;"
  end
end
