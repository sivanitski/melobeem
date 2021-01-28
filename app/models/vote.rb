class Vote < ApplicationRecord
  belongs_to :entry
  belongs_to :user

  validates :value, presence: true

  after_commit :increase_leaderboard_score, on: :create
  after_commit :reduce_leaderboard_score, on: :destroy

  private

  def increase_leaderboard_score
    Leaderboard::Actions.increment_score(value, entry_id)
  end

  def reduce_leaderboard_score
    Leaderboard::Actions.decrement_score(value, entry_id)
  end
end
