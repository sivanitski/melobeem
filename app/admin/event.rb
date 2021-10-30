ActiveAdmin.register Event do
  permit_params :event_date, :event_type

  index do
    selectable_column
    id_column
    column :event_date
    column :event_type
    column :created_at
    column :updated_at

    actions
  end

  filter :event_date
  filter :event_type
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :event_date
      f.input :event_type, as: :select, collection: Event.event_types.keys
    end
    f.actions
  end
end
