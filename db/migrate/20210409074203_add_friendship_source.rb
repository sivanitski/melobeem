class AddFriendshipSource < ActiveRecord::Migration[6.1]
  def change
    create_enum :friendships_source_type, %w[internal external]
    add_column :friendships, :source_type, :friendships_source_type, default: 'internal', null: false, index: true
  end
end
