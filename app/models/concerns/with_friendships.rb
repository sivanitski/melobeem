module WithFriendships
  extend ActiveSupport::Concern

  included do
    has_many :friendships, inverse_of: :user, dependent: :destroy
    has_many :friends,
             -> { select(select_scope) },
             through: :friendships
    has_many :internal_friends,
             -> { where(friendships: { source_type: 'internal' }).select(select_scope) },
             through: :friendships,
             source: :friend
    has_many :external_friends,
             -> { where(friendships: { source_type: 'external' }).select(select_scope) },
             through: :friendships,
             source: :friend

    def self.select_scope
      'users.*, friendships.source_type AS source_type, friendships.invitation_prize AS invitation_prize'
    end
  end
end
