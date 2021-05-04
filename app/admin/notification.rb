ActiveAdmin.register Notification do # rubocop:disable Metrics/BlockLength
  permit_params :user_id, :entry_id, :source_type, :payload, :read

  index do
    selectable_column
    id_column
    column :user
    column :entry
    column :source_type
    column :read
    column :created_at
    column :updated_at
    actions
  end

  filter :user, as: :searchable_select
  filter :entry, as: :searchable_select
  filter :source_type, as: :select, collection: Notification.source_types.keys
  filter :read
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user, as: :searchable_select
      f.input :entry, as: :searchable_select
      f.input :source_type, as: :select, collection: Notification.source_types.keys
      f.input :read
      f.input :payload
    end
    f.actions
  end
end
