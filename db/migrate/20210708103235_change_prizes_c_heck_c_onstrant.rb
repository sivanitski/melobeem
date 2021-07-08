class ChangePrizesCHeckCOnstrant < ActiveRecord::Migration[6.1]
  def change
    begin
      remove_check_constraint :prizes, "value = ANY (ARRAY[1, 5, 10, 20, 30])"
    rescue
      p 'have no constraint'
    ensure
      add_check_constraint :prizes, 'value IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30)'
    end
  end
end
