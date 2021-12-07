class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.belongs_to :user, foreign_key: true, index: true
      t.belongs_to :entry, foreign_key: true, index: true
      t.bigint :parent_id, index: true

      t.text :body

      t.timestamps
    end
  end
end
