class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  belongs_to :competition
  belongs_to :user
  has_one_attached :image, dependent: :destroy

  validates :name, presence: true
  validates :level, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }

  scope :active, -> { where(deactivated: false) }

  def update_level!
    level = LEVELS.detect { |_k, v| v.include? total_votes }&.first || LEVELS.keys.last
    update!(level: level)
  end
end
