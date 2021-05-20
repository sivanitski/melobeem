class AddEnumForShop < ActiveRecord::Migration[6.1]
  def up
    add_enum_value :vote_source_type, "shop"
  end

  def down
    remove_enum_value :vote_source_type, "shop"
  end
end
