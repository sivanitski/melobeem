class Vote < ApplicationRecord
  enum source_type: { user: 'user', spinner: 'spinner', bonus: 'bonus' }

  belongs_to :entry
  belongs_to :user

  validates :value, presence: true
  validates :source_type, inclusion: { in: source_types.keys }

  def apply!
    entry.increment!(:total_votes, value) # rubocop:disable Rails/SkipsModelValidations
  end
end
