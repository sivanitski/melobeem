ActiveAdmin.register PurchaseTransaction do # rubocop:disable Metrics/BlockLength
  permit_params :intent_id, :amount, :amount_received, :value, :status, :full_info,
                :user_id, :entry_id, :competition_id, :product_type

  index do
    selectable_column
    id_column
    column :user
    column :entry
    column :status
    column :value
    column :amount
    column :product_type
    column :created_at

    actions
  end

  filter :intent_id
  filter :amount
  filter :amount_received
  filter :value
  filter :status, as: :select, collection: PurchaseTransaction.statuses.keys
  filter :user, as: :searchable_select
  filter :entry, as: :searchable_select
  filter :competition, as: :searchable_select
  filter :product_type, as: :select, collection: PurchaseTransaction.product_types.keys
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :intent_id
      f.input :amount
      f.input :amount_received
      f.input :value
      f.input :status, as: :select, collection: PurchaseTransaction.statuses.keys
      f.input :user, as: :searchable_select
      f.input :entry, as: :searchable_select
      f.input :competition, as: :searchable_select
      f.input :product_type, as: :select, collection: PurchaseTransaction.product_types.keys
    end
    f.actions
  end
end
