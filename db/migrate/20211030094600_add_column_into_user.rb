class AddColumnIntoUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :last_time_see_sales_at, :datetime
  end
end
