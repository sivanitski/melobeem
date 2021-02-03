# frozen_string_literal: true

class User < ApplicationRecord
  has_many :votes, dependent: :nullify
  has_many :entries, dependent: :nullify
  has_many :purchase_transactions, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  include DeviseTokenAuth::Concerns::User

  validates :name, :provider, presence: true
end
