class AddProductIntoTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :purchase_transactions, :product_id, :bigint, index: true
  end
end
