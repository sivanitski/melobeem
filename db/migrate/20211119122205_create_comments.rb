class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string  :description
      t.references :user
      t.belongs_to :entry

      t.timestamps
    end
  end
end
