class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.date :event_date
      t.integer :event_type, default: 0, null: false

      t.timestamps
    end
  end
end
