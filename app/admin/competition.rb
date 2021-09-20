ActiveAdmin.register Competition do # rubocop:disable Metrics/BlockLength
  permit_params :title, :prize_cents, :starts_at, :ends_at, :status, :revenue

  index do
    selectable_column
    id_column
    column :title
    column :prize_cents
    column :starts_at
    column :ends_at
    column :status
    column :revenue
    column :created_at
    column :updated_at

    actions
  end

  filter :title
  filter :prize_cents
  filter :starts_at
  filter :ends_at
  filter :status, as: :select, collection: Competition.statuses.to_a
  filter :revenue
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :title
      f.input :prize_cents
      f.input :starts_at
      f.input :ends_at
      f.input :status, as: :select, collection: Competition.statuses.keys
      f.input :revenue
    end
    f.actions
  end
end
