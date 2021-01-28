class Entry < ApplicationRecord
  enum gender: { male: 0, female: 1 }

  has_many :votes, dependent: :destroy
  has_many :purchase_transactions, dependent: :destroy
  belongs_to :competition
  belongs_to :user
  has_one_attached :image, dependent: :destroy

  validates :gender, presence: true
  validates :user_id, uniqueness: { scope: :competition_id }

  after_commit :add_to_leaderboard, on: :create
  after_commit :remove_from_leaderboard, on: :destroy

  private

  def add_to_leaderboard
    Leaderboard::Actions.increment_score(0, id)

    Leaderboard::Actions.setup_entry_details(self)
  end

  def remove_from_leaderboard
    Leaderboard::Actions.destroy_entry(id)
  end
end
