class Vote < ApplicationRecord
  enum source_type: { user: 'user', spinner: 'spinner', bonus: 'bonus', invitation: 'invitation' }

  belongs_to :entry
  belongs_to :user
  belongs_to :invited_user, class_name: 'User', optional: true

  validates :value, presence: true
  validates :source_type, inclusion: { in: source_types.keys }

  def apply!
    entry.increment!(:total_votes, value) # rubocop:disable Rails/SkipsModelValidations
    entry.update_level!
  end
end
