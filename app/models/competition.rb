class Competition < ApplicationRecord
  enum status: { started: 'started', finished: 'finished' }

  has_many :entries, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy

  validates :title, presence: true
  validates :prize_cents, presence: true
  validates :starts_at, presence: true, uniqueness: true
  validates :ends_at, presence: true

  def self.current!
    where(status: :started).take!
  end

  def increment_revenue!(transaction)
    increment!(:revenue, transaction.amount_received) # rubocop:disable Rails/SkipsModelValidations
  end
end
