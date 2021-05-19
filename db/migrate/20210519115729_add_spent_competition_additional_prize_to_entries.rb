class AddSpentCompetitionAdditionalPrizeToEntries < ActiveRecord::Migration[6.1]
  def change
    add_column :entries, :spent_competition_additional_prize, :boolean, null: false, default: false
  end
end
