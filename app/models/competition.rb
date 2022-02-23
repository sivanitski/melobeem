class Competition < ApplicationRecord
  has_many :entries, dependent: :destroy

  validates :title, presence: true
  validates :prize_cents, presence: true
  validates :starts_at, presence: true
  validates :ends_at, presence: true

  def self.current!
    order(created_at: :desc).take!
  end
end
