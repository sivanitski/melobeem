class AddNullConstraintsToCompetitions < ActiveRecord::Migration[6.1]
  def change
    change_column_null :competitions, :prize_cents, false, 0

    populate_competitions_dates

    change_column_null :competitions, :starts_at, false
    change_column_null :competitions, :ends_at, false
  end

  def populate_competitions_dates
    Competition.all.find_each do |comp|
      start = comp.created_at.beginning_of_month
      ending = comp.created_at.end_of_month
      comp.update(starts_at: start, ends_at: ending)
    end
  end
end
