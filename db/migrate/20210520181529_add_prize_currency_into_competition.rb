class AddPrizeCurrencyIntoCompetition < ActiveRecord::Migration[6.1]
  def change
    add_column :competitions, :prize_currency, :string, default: 'USD'
  end
end
