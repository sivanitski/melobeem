class AddSourceTypeIntoVotes < ActiveRecord::Migration[6.1]
  def change
    create_enum :vote_source_type, %w[user spinner bonus]

    add_column :votes, :source_type, :vote_source_type, default: 'user', null: false, index: true
  end
end
