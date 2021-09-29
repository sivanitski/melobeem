class Competition < ApplicationRecord
  enum status: { started: 'started', finished: 'finished' }

  DURATION = 3.weeks

  monetize :prize_cents, as: :prize, with_currency: :prize_currency

  has_many :entries, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy

  validates :title, presence: true
  validates :prize_cents, presence: true
  validates :starts_at, presence: true, uniqueness: true
  validates :ends_at, presence: true

  after_commit :schedule_finish, on: :create

  def self.current!
    where(status: :started).take!
  end

  def increment_revenue!(transaction)
    increment!(:revenue, transaction.amount_received) # rubocop:disable Rails/SkipsModelValidations
  end

  def schedule_finish
    FinishCompetitionWorker.perform_at(ends_at)
  end
end
