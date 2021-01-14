class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy
  belongs_to :competition

  validates :gender, presence: true

  enum gender: { male: 0, female: 1 }
end
