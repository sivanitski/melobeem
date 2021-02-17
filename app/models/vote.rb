class Vote < ApplicationRecord
  belongs_to :entry
  belongs_to :user

  validates :value, presence: true

  def apply!
    entry.increment!(:total_votes, value) # rubocop:disable Rails/SkipsModelValidations
  end
end
