class CompetitionAdditionalPrize < ActiveRecord::Migration[6.1]
  def change
    add_column :entries, :competition_additional_prize, :integer, null: false, default: 0
  end
end
