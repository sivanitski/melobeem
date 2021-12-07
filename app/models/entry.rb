class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :prizes, dependent: :destroy
  has_many :prize_times, dependent: :destroy
  has_many :awards, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :competition
  belongs_to :user, optional: true
  has_one_attached :image, dependent: :destroy

  before_validation :allowed_to_change_image?, if: proc { |record| record.attachment_changes.any? }

  validates :name, presence: true
  validates :level, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }, if: -> { user_id.present? }
  validates :image, content_type: %w[image/png image/jpg image/jpeg image/gif image/webp],
                    size: { less_than: 10.megabytes, message: 'must be less than 10mb' }

  scope :active, -> { where(deactivated: false) }

  def update_level!
    current_level = LEVELS.detect { |_k, v| v.include? total_votes }&.first
    current_level = LEVELS.keys.last if current_level.blank? && total_votes > LEVELS.values.first.first
    return false if current_level.blank? || current_level.eql?(level)

    update!(level: current_level)
  end

  private

  def allowed_to_change_image?
    return if total_votes.to_i.zero?

    errors.add(:image, 'can be changed before first vote')
  end
end
