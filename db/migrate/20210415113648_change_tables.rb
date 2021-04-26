class ChangeTables < ActiveRecord::Migration[6.1]
  def up
    remove_column :competitions, :status
    create_enum :competition_status, %w[started finished]
    add_column :competitions, :status, :competition_status, default: 'started', null: false
    add_column :competitions, :revenue, :integer, null: false, default: 0
    add_column :entries, :competition_money_prize, :integer, null: false, default: 0
    add_reference :purchase_transactions, :competition, foreign_key: true
  end

  def down
    remove_column :competitions, :status
    add_column :competitions, :status, :string
    execute "DROP type competition_status;"
    remove_column :competitions, :revenue
    remove_column :entries, :competition_money_prize
    remove_reference :purchase_transactions, :competition, foreign_key: true
  end
end
