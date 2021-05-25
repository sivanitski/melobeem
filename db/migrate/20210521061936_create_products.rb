class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_enum :products_product_type, %w[vote spinner]

    create_table :products do |t|
      t.integer :tier_id, null: false
      t.string  :title
      t.text    :description
      t.integer :value

      t.timestamps
    end

    add_column :products, :product_type, :products_product_type, default: 'vote'
  end
end
