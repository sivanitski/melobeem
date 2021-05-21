class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :prizes, dependent: :destroy
  has_many :prize_times, dependent: :destroy
  belongs_to :competition
  belongs_to :user
  has_one_attached :image, dependent: :destroy

  validates :name, presence: true
  validates :level, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }
  validates :image, content_type: %w[image/png image/jpg image/jpeg image/gif image/webp],
                    size: { less_than: 10.megabytes }

  scope :active, -> { where(deactivated: false) }

  def update_level!
    current_level = LEVELS.detect { |_k, v| v.include? total_votes }&.first || LEVELS.keys.last
    return if current_level.eql?(level)

    update!(level: current_level)
  end
end
