class PrizeTime < ApplicationRecord
  belongs_to :entry

  scope :not_expired, -> { where('created_at > ?', 24.hours.ago) }

  validates :value, presence: true
  validates :entry_id, presence: true
end
