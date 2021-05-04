ActiveAdmin.register Entry do # rubocop:disable Metrics/BlockLength
  permit_params :user_id, :competition_id, :name, :total_votes, :level, :deactivated, :competition_money_prize, :image

  index do
    selectable_column
    id_column
    column :user
    column :competition
    column :name
    column :total_votes
    column :level
    column :deactivated
    column :competition_money_prize
    column :created_at
    column :updated_at

    actions
  end

  filter :user, as: :searchable_select
  filter :competition, as: :searchable_select
  filter :name
  filter :total_votes
  filter :level
  filter :deactivated
  filter :competition_money_prize
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user, as: :searchable_select
      f.input :competition, as: :searchable_select
      f.input :name
      f.input :total_votes
      f.input :level
      f.input :deactivated
      f.input :competition_money_prize

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
      row :user
      row :competition
      row :name
      row :total_votes
      row :level
      row :deactivated
      row :competition_money_prize
      row :image do |img|
        image_tag(img.image.url, height: '200')
      end
    end
    active_admin_comments
  end
end
