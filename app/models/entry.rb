class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  belongs_to :competition
  belongs_to :user
  has_one_attached :image, dependent: :destroy

  validates :gender, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }

  enum gender: { male: 0, female: 1 }
end
