class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[facebook]

  has_many :votes, dependent: :nullify
  has_many :entries, dependent: :nullify
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :inverse_friendships, class_name: 'Friendship', foreign_key: 'friend_id', dependent: :destroy # rubocop: disable Rails/InverseOf
  has_many :inverse_friends, through: :inverse_friendships, source: :user
  has_one_attached :avatar, dependent: :destroy

  validates :name, :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :email, uniqueness: true, allow_blank: true # rubocop:disable Rails/UniqueValidationWithoutIndex

  def email_required?
    false
  end
end
