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

ActiveRecord::Schema.define(version: 2021_04_26_065526) do

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

  create_enum :vote_source_type, [
    "user",
    "spinner",
    "bonus",
    "invitation",
  ], force: :cascade

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

  create_table "competitions", force: :cascade do |t|
    t.string "title", null: false
    t.integer "prize_cents", null: false
    t.datetime "starts_at", null: false
    t.datetime "ends_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "status", default: "started", null: false, enum_name: "competition_status"
    t.integer "revenue", default: 0, null: false
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
    t.index ["competition_id"], name: "index_entries_on_competition_id"
    t.index ["total_votes"], name: "index_entries_on_total_votes"
    t.index ["user_id", "competition_id"], name: "index_entries_on_user_id_and_competition_id", unique: true
    t.index ["user_id"], name: "index_entries_on_user_id"
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
    t.check_constraint "value = ANY (ARRAY[1, 5, 10, 20, 30])"
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
    t.index ["email"], name: "index_users_on_email"
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, where: "(deactivated IS FALSE)"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.integer "value", default: 1, null: false
    t.jsonb "fingerprint", default: {}, null: false
    t.bigint "user_id"
    t.bigint "entry_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.enum "source_type", default: "user", null: false, enum_name: "vote_source_type"
    t.index "entry_id, ((created_at)::date)", name: "votes_entry_id_created_at_idx"
    t.index ["entry_id"], name: "index_votes_on_entry_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
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
