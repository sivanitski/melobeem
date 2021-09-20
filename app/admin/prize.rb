ActiveAdmin.register Prize do # rubocop:disable Metrics/BlockLength
  permit_params :level, :spent, :entry_id, :value, :source_type

  index do
    selectable_column
    id_column
    column :level
    column :spent
    column :entry
    column :value
    column :source_type
    column :created_at
    column :updated_at

    actions
  end

  filter :level
  filter :spent
  filter :entry, as: :searchable_select
  filter :value, as: :select, collection: %w[1 5 10 20 30]
  filter :source_type, as: :select, collection: Prize.source_types.to_a
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :level
      f.input :spent
      f.input :entry, as: :searchable_select
      f.input :value, as: :select, collection: %w[1 5 10 20 30]
      f.input :source_type, as: :select, collection: Prize.source_types.keys
    end
    f.actions
  end
end
