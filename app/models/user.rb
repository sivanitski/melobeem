class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[facebook]

  has_many :votes, dependent: :nullify
  has_many :entries, dependent: :nullify
  has_many :purchase_transactions, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy

  validates :name, :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :email, uniqueness: true, allow_blank: true # rubocop:disable Rails/UniqueValidationWithoutIndex

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email if auth.info.email.present?
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name
    end
  end

  def email_required?
    false
  end
end
