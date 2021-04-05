class Spin < ApplicationRecord
  belongs_to :user

  scope :free, -> { where(paid: false) }

  validates :user, presence: true

  after_create :decrement_count, if: :paid

  private

  def decrement_count
    return if user.premium_spins.zero?

    user.decrement!(:premium_spins) # rubocop:disable Rails/SkipsModelValidations
  end
end
