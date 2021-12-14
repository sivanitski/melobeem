class User < ApplicationRecord
  include WithFriendships

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[facebook]

  has_many :votes, dependent: :nullify
  has_many :entries, dependent: :nullify
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :spins, dependent: :destroy
  has_many :awards, through: :entries
  has_many :comments, dependent: :destroy
  has_many :users_reports, dependent: :destroy

  has_one_attached :avatar, dependent: :destroy

  validates :name, :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider, conditions: -> { where(deactivated: false) } }
  validates :email, uniqueness: true, allow_blank: true # rubocop:disable Rails/UniqueValidationWithoutIndex

  scope :active, -> { where(deactivated: false) }

  def email_required?
    false
  end
end
