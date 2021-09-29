class Award < ApplicationRecord
  enum award_type: { spinner: 0, vote: 1, time: 2 }

  belongs_to :entry

  validates :value, presence: true

  scope :not_claimed_public, -> { where(claimed: false, is_secret: false) }
  scope :not_claimed, -> { where(claimed: false) }
end
