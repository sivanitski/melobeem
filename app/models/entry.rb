class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  belongs_to :competition
  belongs_to :user

  validates :gender, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }

  enum gender: { male: 0, female: 1 }
end
