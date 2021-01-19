class ChangeValueDefaultInVotesTable < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:votes, :value, 1)
  end
end
