# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_19_061401) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_enum :competition_status, [
    "started",
    "finished",
  ], force: :cascade

  create_enum :friendships_source_type, [
    "internal",
    "external",
  ], force: :cascade

  create_enum :notification_source_type, [
    "unlock",
    "vote",
    "purchase",
    "bonus",
    "invitation",
  ], force: :cascade

  create_enum :prize_source_type, [
    "vote",
    "spin",
    "min",
  ], force: :cascade

  create_enum :product_type, [
    "vote",
    "spin",
  ], force: :cascade

  create_enum :products_product_type, [
    "vote",
    "spinner",
  ], force: :cascade

  create_enum :vote_source_type, [
    "user",
    "spinner",
    "bonus",
    "invitation",
    "shop",
  ], force: :cascade

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "awards", force: :cascade do |t|
    t.bigint "entry_id"
    t.integer "award_type", default: 0, null: false
    t.integer "value"
    t.boolean "is_secret", default: false
    t.boolean "claimed", default: false
    t.datetime "claimed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["entry_id"], name: "index_awards_on_entry_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "entry_id"
    t.bigint "parent_id"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_reported", default: false
    t.index ["entry_id"], name: "index_comments_on_entry_id"
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "competitions", force: :cascade do |t|
    t.string "title", null: false
    t.integer "prize_cents", null: false
    t.datetime "starts_at", null: false
    t.datetime "ends_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "status", default: "started", null: false, enum_name: "competition_status"
    t.integer "revenue", default: 0, null: false
    t.integer "money_prizes_final_sum", default: 0, null: false
    t.string "prize_currency", default: "USD"
    t.index ["starts_at"], name: "index_competitions_on_starts_at", unique: true
  end

  create_table "entries", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "competition_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", null: false
    t.integer "total_votes", default: 0, null: false
    t.integer "level", default: 1, null: false
    t.boolean "deactivated", default: false, null: false
    t.integer "competition_money_prize", default: 0, null: false
    t.integer "final_rank", default: 0, null: false
    t.integer "competition_additional_prize", default: 0, null: false
    t.boolean "spent_competition_additional_prize", default: false, null: false
    t.json "transformations", default: {}
    t.string "freebies_click_id"
    t.index ["competition_id"], name: "index_entries_on_competition_id"
    t.index ["total_votes"], name: "index_entries_on_total_votes"
    t.index ["user_id", "competition_id"], name: "index_entries_on_user_id_and_competition_id", unique: true
    t.index ["user_id"], name: "index_entries_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.date "event_date"
    t.integer "event_type", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_id"
    t.enum "source_type", default: "internal", null: false, enum_name: "friendships_source_type"
    t.integer "invitation_prize"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "entry_id"
    t.enum "source_type", enum_name: "notification_source_type"
    t.jsonb "payload", default: {}, null: false
    t.boolean "read", default: false
    t.index ["entry_id"], name: "index_notifications_on_entry_id"
    t.index ["read"], name: "index_notifications_on_read"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "prize_times", force: :cascade do |t|
    t.integer "value", null: false
    t.bigint "entry_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["entry_id"], name: "index_prize_times_on_entry_id"
  end

  create_table "prizes", force: :cascade do |t|
    t.integer "level", default: 1, null: false
    t.boolean "spent", default: false, null: false
    t.bigint "entry_id"
    t.integer "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "source_type", enum_name: "prize_source_type"
    t.index ["entry_id"], name: "index_prizes_on_entry_id"
    t.check_constraint "value = ANY (ARRAY[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30])"
  end

  create_table "products", force: :cascade do |t|
    t.integer "tier_id", null: false
    t.string "title"
    t.text "description"
    t.integer "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "product_type", default: "vote", enum_name: "products_product_type"
  end

  create_table "purchase_transactions", force: :cascade do |t|
    t.string "intent_id"
    t.integer "amount"
    t.integer "amount_received"
    t.integer "value"
    t.integer "status", default: 0
    t.jsonb "full_info", default: {}, null: false
    t.bigint "user_id"
    t.bigint "entry_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "competition_id"
    t.enum "product_type", enum_name: "product_type"
    t.bigint "product_id"
    t.index ["competition_id"], name: "index_purchase_transactions_on_competition_id"
    t.index ["entry_id"], name: "index_purchase_transactions_on_entry_id"
    t.index ["user_id"], name: "index_purchase_transactions_on_user_id"
  end

  create_table "spins", force: :cascade do |t|
    t.boolean "paid", default: false, null: false
    t.integer "value", default: 0, null: false
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_spins_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "provider", null: false
    t.string "uid", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "deactivated", default: false, null: false
    t.integer "premium_spins", default: 0, null: false
    t.boolean "admin", default: false
    t.string "country"
    t.boolean "captcha_verified", default: false
    t.datetime "last_time_see_sales_at"
    t.index ["email"], name: "index_users_on_email"
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, where: "(deactivated IS FALSE)"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_reports", force: :cascade do |t|
    t.string "target_type", null: false
    t.bigint "target_id", null: false
    t.bigint "user_id"
    t.integer "report_type", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.text "details"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["target_type", "target_id", "user_id"], name: "index_user_reports_uniqueness", unique: true
    t.index ["target_type", "target_id"], name: "index_users_reports_on_target"
    t.index ["user_id"], name: "index_users_reports_on_user_id"
  end

  create_table "votes", force: :cascade do |t|
    t.integer "value", default: 1, null: false
    t.jsonb "fingerprint", default: {}, null: false
    t.bigint "user_id"
    t.bigint "entry_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "source_type", default: "user", null: false, enum_name: "vote_source_type"
    t.bigint "invited_user_id"
    t.index "entry_id, ((created_at)::date)", name: "votes_entry_id_created_at_idx"
    t.index ["entry_id"], name: "index_votes_on_entry_id"
    t.index ["invited_user_id"], name: "index_votes_on_invited_user_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "awards", "entries"
  add_foreign_key "comments", "entries"
  add_foreign_key "comments", "users"
  add_foreign_key "entries", "competitions"
  add_foreign_key "entries", "users"
  add_foreign_key "notifications", "entries"
  add_foreign_key "notifications", "users"
  add_foreign_key "prize_times", "entries"
  add_foreign_key "prizes", "entries"
  add_foreign_key "purchase_transactions", "competitions"
  add_foreign_key "purchase_transactions", "entries"
  add_foreign_key "purchase_transactions", "users"
  add_foreign_key "spins", "users"
  add_foreign_key "votes", "entries"
  add_foreign_key "votes", "users"
end
