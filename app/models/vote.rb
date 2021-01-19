class Vote < ApplicationRecord
  belongs_to :entry
  belongs_to :user

  validates :value, presence: true
end
