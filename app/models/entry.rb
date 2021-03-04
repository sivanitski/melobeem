class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  belongs_to :competition
  belongs_to :user
  has_one_attached :image, dependent: :destroy

  validates :name, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }
end
