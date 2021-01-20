class AddForeignKeyForEntryUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :entries, :user, index: true, foreign_key: true
  end
end
