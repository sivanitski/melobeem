class Notification < ApplicationRecord
  enum source_type: { unlock: 'unlock', vote: 'vote', purchase: 'purchase', bonus: 'bonus' }

  belongs_to :user
  belongs_to :entry
end
