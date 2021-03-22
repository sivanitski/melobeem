class ChangeIndexForUsersDeactivated < ActiveRecord::Migration[6.1]
  def up
    remove_index :users, name: 'index_users_on_deactivated_and_provider_and_uid'
    add_index :users,[:provider, :uid], unique: true, where: 'deactivated IS FALSE'
  end

  def down
    remove_index :users, name: "index_users_on_provider_and_uid"
    add_index :users, [:deactivated, :provider, :uid], unique: true
  end
end
