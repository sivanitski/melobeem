ActiveAdmin.register Vote do # rubocop:disable Metrics/BlockLength
  permit_params :value, :fingerprint, :user_id, :entry_id, :source_type

  index do
    selectable_column
    id_column
    column :value
    column :user
    column :entry
    column :source_type
    column :created_at
    column :updated_at

    actions
  end

  filter :value
  filter :user, as: :searchable_select
  filter :entry, as: :searchable_select
  filter :source_type, as: :select, collection: Vote.source_types.keys
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :value
      f.input :user, as: :searchable_select
      f.input :entry, as: :searchable_select
      f.input :fingerprint
      f.input :source_type, as: :select, collection: Vote.source_types.keys
    end
    f.actions
  end
end
