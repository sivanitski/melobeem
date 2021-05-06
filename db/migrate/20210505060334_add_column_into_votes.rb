class AddColumnIntoVotes < ActiveRecord::Migration[6.1]
  def change
    add_column :votes, :invited_user_id, :bigint

    add_index :votes, :invited_user_id
  end
end
