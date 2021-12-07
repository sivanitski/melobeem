class AddReportFeatureForComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :is_reported, :boolean, default: false
  end
end
