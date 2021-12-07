ActiveAdmin.register Comment, as: 'User Comments' do # rubocop:disable Metrics/BlockLength
  permit_params :user_id, :entry_id, :parent_id, :body, :created_at, :updated_at, :is_reported

  index do
    selectable_column
    id_column
    column :user_id
    column :entry_id
    column :parent_id
    column :body
    column :created_at
    column :updated_at
    column :is_reported

    actions
  end

  filter :user_id
  filter :entry_id
  filter :parent_id
  filter :body
  filter :is_reported
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user_id
      f.input :entry_id
      f.input :parent_id
      f.input :body
      f.input :is_reported
    end
    f.actions
  end
end
