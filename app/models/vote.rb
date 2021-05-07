class Vote < ApplicationRecord
  NON_PRIZE_LEVEL = 1

  enum source_type: { user: 'user', spinner: 'spinner', bonus: 'bonus', invitation: 'invitation' }

  belongs_to :entry
  belongs_to :user
  belongs_to :invited_user, class_name: 'User', optional: true

  validates :value, presence: true
  validates :source_type, inclusion: { in: source_types.keys }

  def apply!
    entry.increment!(:total_votes, value) # rubocop:disable Rails/SkipsModelValidations
    entry.update_level!
    create_prizes(entry.level)
  end

  private

  def make_prize(level:)
    prize = PRIZES.sample
    entry.prizes.create!(level: level, source_type: prize['source_type'], value: prize['value'])
  end

  def send_notification(prize:, level:)
    Notifications::CompleteLevel.new(entry: entry, prize: prize, level: level).call
  end

  def create_prizes(current_level)
    last_prize = entry.prizes.order(level: :desc).limit(1).first
    last_prize_level = last_prize&.level.to_i + 1

    [*last_prize_level..current_level].each do |level|
      next if level == NON_PRIZE_LEVEL

      prize = make_prize(level: level)

      send_notification(prize: prize, level: level)
    end
  end
end
