class CreateUsersReports < ActiveRecord::Migration[6.1]
  def change
    create_table :users_reports do |t|
      t.belongs_to :target, null: false, polymorphic: true, index: true
      t.belongs_to :user, index: true

      t.integer :report_type, default: 0, null: false
      t.integer :status, default: 0, null: false
      t.text :details

      t.index [ :target_type, :target_id, :user_id ], name: "index_user_reports_uniqueness", unique: true
      t.timestamps
    end
  end
end
