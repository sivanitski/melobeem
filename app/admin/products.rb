ActiveAdmin.register Product do # rubocop:disable Metrics/BlockLength
  permit_params :product_type, :tier_id, :title, :value, :description

  index do
    selectable_column
    id_column
    column :product_type
    column :tier_id
    column :title
    column :value
    column :created_at
    column :updated_at

    actions
  end

  filter :product_type, as: :select, collection: Product.product_types.keys
  filter :tier_id
  filter :title
  filter :value
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :product_type, as: :select, collection: Product.product_types.keys
      f.input :title
      f.input :description
      f.input :tier_id
      f.input :value
    end
    f.actions
  end
end
