class Entry < ApplicationRecord
  NON_PRIZE_LEVEL = 1

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

  scope :active, -> { where(deactivated: false) }

  def update_level!
    level = LEVELS.detect { |_k, v| v.include? total_votes }&.first || LEVELS.keys.last
    return if level == self.level

    update!(level: level)
    return if level == NON_PRIZE_LEVEL

    prize = make_prize(entry: self, level: level)
    send_notification(entry: self, prize: prize, level: level)
  end

  private

  def make_prize(entry:, level:)
    prize = PRIZES.sample
    Prize.create!(entry: entry, level: level, source_type: prize['source_type'], value: prize['value'])
  end

  def send_notification(entry:, prize:, level:)
    Notifications::CompleteLevel.new(entry: entry, prize: prize, level: level).call
  end
end
