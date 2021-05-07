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
    current_level = LEVELS.detect { |_k, v| v.include? total_votes }&.first || LEVELS.keys.last
    return if current_level.eql?(level)

    update!(level: current_level)

    current_prize = create_prizes(current_level)

    send_notification(entry: self, prize: current_prize, level: current_level)
  end

  private

  def make_prize(level:)
    prize = PRIZES.sample
    prizes.create!(level: level, source_type: prize['source_type'], value: prize['value'])
  end

  def send_notification(entry:, prize:, level:)
    Notifications::CompleteLevel.new(entry: entry, prize: prize, level: level).call
  end

  def create_prizes(current_level)
    last_prize = prizes.order(level: :desc).limit(1).first
    last_prize_level = last_prize&.level.to_i + 1

    current_prize = nil

    [*last_prize_level..current_level].each do |level|
      next if level == NON_PRIZE_LEVEL

      current_prize = make_prize(level: level)
    end

    current_prize
  end
end
