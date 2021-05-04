ActiveAdmin.register Spin do
  permit_params :paid, :value, :user_id

  index do
    selectable_column
    id_column
    column :paid
    column :value
    column :user
    column :created_at
    column :updated_at

    actions
  end

  filter :paid
  filter :value
  filter :user, as: :searchable_select
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :paid
      f.input :value
      f.input :user, as: :searchable_select
    end
    f.actions
  end
end
