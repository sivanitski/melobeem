ActiveAdmin.register User do # rubocop:disable Metrics/BlockLength
  permit_params :name, :provider, :uid, :email, :deactivated, :premium_spins, :admin

  index do
    selectable_column
    id_column
    column :name
    column :provider
    column :uid
    column :email
    column :deactivated
    column :premium_spins
    column :admin
    column :created_at

    actions
  end

  filter :name
  filter :provider
  filter :uid
  filter :email
  filter :deactivated
  filter :premium_spins
  filter :admin
  filter :created_at
  filter :updated_at
  filter :sign_in_count
  filter :current_sign_in_at
  filter :last_sign_in_at
  filter :current_sign_in_ip
  filter :last_sign_in_ip

  form do |f|
    f.inputs do
      f.input :name
      f.input :provider
      f.input :uid
      f.input :email
      f.input :deactivated
      f.input :premium_spins
      f.input :admin
      if f.object.avatar.attached?
        f.input :avatar, as: :file, hint: image_tag(f.object.avatar.url, height: '200')
      else
        f.input :avatar, as: :file
      end
    end
    f.actions
  end

  show do # rubocop:disable Metrics/BlockLength
    attributes_table do
      row :name
      row :provider
      row :uid
      row :email
      row :deactivated
      row :premium_spins
      row :sign_in_count
      row :current_sign_in_at
      row :last_sign_in_at
      row :current_sign_in_ip
      row :last_sign_in_ip
      row :created_at
      row :updated_at
      row :avatar do |img|
        image_tag(img.avatar.url, height: '200')
      end
    end
    panel 'Purchases' do
      table_for user.purchase_transactions do
        column :entry
        column :status
        column :value
        column :amount
        column :product_type
        column :created_at
      end
    end
    active_admin_comments
  end
end
