class Vote < ApplicationRecord
  belongs_to :entry

  validates :value, presence: true
end
