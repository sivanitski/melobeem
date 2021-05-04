ActiveAdmin.register Friendship do # rubocop:disable Metrics/BlockLength
  permit_params :user_id, :friend_id, :source_type, :invitation_prize

  index do
    selectable_column
    id_column
    column :user
    column :friend
    column :source_type
    column :invitation_prize
    column :created_at
    column :updated_at

    actions
  end

  filter :user, as: :searchable_select
  filter :friend, as: :searchable_select
  filter :source_type, as: :select, collection: Friendship.source_types.keys
  filter :invitation_prize
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user, as: :searchable_select
      f.input :friend, as: :searchable_select
      f.input :source_type, as: :select, collection: Friendship.source_types.keys
      f.input :invitation_prize
    end
    f.actions
  end
end
