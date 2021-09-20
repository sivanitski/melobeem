ActiveAdmin.register Product do # rubocop:disable Metrics/BlockLength
  permit_params :product_type, :tier_id, :title, :value, :description, :image

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

  filter :product_type, as: :select, collection: Product.product_types.to_a
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

      if f.object.image.attached?
        f.input :image, as: :file, hint: image_tag(f.object.image.url, height: '200')
      else
        f.input :image, as: :file
      end
    end
    f.actions
  end

  show do
    attributes_table do
      row :product_type
      row :title
      row :description
      row :tier_id
      row :value

      row :image do |img|
        image_tag(img.image.url, height: '200')
      end
    end
    active_admin_comments
  end
end
