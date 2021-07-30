class AddTransformationIntoEntry < ActiveRecord::Migration[6.1]
  def change
    add_column :entries, :transformations, :json, default: {}
  end
end
