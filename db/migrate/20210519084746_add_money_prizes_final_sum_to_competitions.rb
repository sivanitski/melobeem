class AddMoneyPrizesFinalSumToCompetitions < ActiveRecord::Migration[6.1]
  def change
    add_column :competitions, :money_prizes_final_sum, :integer, null: false, default: 0
  end
end
