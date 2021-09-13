module WithFriendships
  extend ActiveSupport::Concern
  included do
    has_many :friendships, inverse_of: :user, dependent: :destroy
    has_many :friends,
             -> { select(select_scope) },
             through: :friendships,
             dependent: :destroy
    has_many :internal_friends,
             -> { where(friendships: { source_type: 'internal' }).select(select_scope) },
             through: :friendships,
             source: :friend,
             dependent: :destroy
    has_many :external_friends,
             -> { where(friendships: { source_type: 'external' }).select(select_scope) },
             through: :friendships,
             source: :friend,
             dependent: :destroy
    def self.select_scope
      'users.*, friendships.source_type AS source_type, friendships.invitation_prize AS invitation_prize'
    end
  end
end
