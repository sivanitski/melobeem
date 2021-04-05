class ChangeColumnNameInPurchaseTransactions < ActiveRecord::Migration[6.1]
  def change
    rename_column :purchase_transactions, :vote_value, :value
  end
end
