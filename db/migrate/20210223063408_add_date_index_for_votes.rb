class AddDateIndexForVotes < ActiveRecord::Migration[6.1]
  def up
    execute('create index on votes (entry_id, (created_at::date));')
  end

  def down
    execute('drop index votes_entry_id_created_at_idx;')
  end
end
