class AddPrizeAmountIntoFriendships < ActiveRecord::Migration[6.1]
  def change
    add_column :friendships, :invitation_prize, :integer
  end
end
