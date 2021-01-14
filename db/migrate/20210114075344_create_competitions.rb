class CreateCompetitions < ActiveRecord::Migration[6.1]
  def change
    create_table :competitions do |t|
      t.string :title, null: false
      t.integer :prize_cents
      t.string :status
      t.timestamp :starts_at
      t.timestamp :ends_at

      t.timestamps
    end
  end
end
