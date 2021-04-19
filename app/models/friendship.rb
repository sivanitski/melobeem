class Friendship < ApplicationRecord
  enum source_type: { internal: 'internal', external: 'external' }

  belongs_to :user
  belongs_to :friend, class_name: 'User'

  validate :already_friends, :self_friend

  def already_friends
    return unless Friendship.exists?(user_id: user_id, friend_id: friend_id)

    errors.add(:user_id, 'and you are already friends')
  end

  def self_friend
    return unless friend_id == user_id

    errors.add(:user_id, 'cannot be friends with himself')
  end
end
