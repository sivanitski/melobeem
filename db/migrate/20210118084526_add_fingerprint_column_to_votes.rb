class AddFingerprintColumnToVotes < ActiveRecord::Migration[6.1]
  def change
    add_column :votes, :fingerprint, :jsonb, default: {}, null: false
  end
end
