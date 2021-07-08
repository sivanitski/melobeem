class ChangePrizesCHeckCOnstrant < ActiveRecord::Migration[6.1]
  def change
    remove_check_constraint :prizes, "value = ANY (ARRAY[1, 5, 10, 20, 30])"
    add_check_constraint :prizes, 'value IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30)'
  end
end
