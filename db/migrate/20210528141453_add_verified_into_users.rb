class AddVerifiedIntoUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :captcha_verified, :boolean, default: false
  end
end
