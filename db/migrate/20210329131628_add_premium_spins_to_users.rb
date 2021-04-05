class AddPremiumSpinsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :premium_spins, :integer, null: false, default: 0
  end
end
