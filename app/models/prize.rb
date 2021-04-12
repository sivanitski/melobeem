class Prize < ApplicationRecord
  enum source_type: { vote: 'vote', spin: 'spin', min: 'min' }, _prefix: :prize

  belongs_to :entry

  validates :level, presence: true
  validates :entry_id, presence: true
end
