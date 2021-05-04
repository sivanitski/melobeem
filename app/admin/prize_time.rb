ActiveAdmin.register PrizeTime do
  permit_params :value, :entry_id

  index do
    selectable_column
    id_column
    column :value
    column :entry
    column :created_at
    column :updated_at

    actions
  end

  filter :entry, as: :searchable_select
  filter :value, as: :select, collection: %w[1 5 10 20 30]
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :entry, as: :searchable_select
      f.input :value, as: :select, collection: %w[1 5 10 20 30]
    end
    f.actions
  end
end
