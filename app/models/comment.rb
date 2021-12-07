class Comment < ApplicationRecord
  belongs_to :entry
  belongs_to :user
  belongs_to :parent, class_name: 'Comment', optional: true

  has_many :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy # rubocop:disable Rails/InverseOf

  validates :body, presence: true, length: { maximum: 1000 }
  validate :bad_words

  scope :main, -> { where(parent_id: nil) }

  private

  def bad_words
    return unless Obscenity.profane?(body)

    errors.add(:bad_words, "you type: #{Obscenity.offensive(body).first}. Please correct you comment")
  end
end
