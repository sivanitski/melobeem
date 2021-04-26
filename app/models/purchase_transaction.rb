class PurchaseTransaction < ApplicationRecord
  enum status: { draft: 0, process: 1, done: 2 }
  enum product_type: { vote: 'vote', spin: 'spin' }

  belongs_to :user
  belongs_to :entry
  belongs_to :competition

  validates :user_id, :entry_id, :competition_id, presence: true
end
