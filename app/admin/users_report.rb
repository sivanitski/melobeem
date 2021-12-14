ActiveAdmin.register UsersReport do
  permit_params :status, :report_type, :target_type, :target_id, :details, :user_id

  form do |f|
    f.inputs do
      f.input :user
      f.input :status, as: :select, collection: UsersReport.statuses.keys
      f.input :report_type, as: :select, collection: UsersReport.report_types.keys
      f.input :target_type, as: :select, collection: %w[Entry Comment]
      f.input :target_id
      f.input :details
    end
    f.actions
  end
end
