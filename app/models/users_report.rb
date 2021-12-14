class UsersReport < ApplicationRecord
  enum status: { active: 0, closed: 1 }, _prefix: true
  enum report_type: { inappropriate: 0, spam: 1, hate_speech: 2, harassing: 3 }

  belongs_to :target, polymorphic: true
  belongs_to :user

  validates :user_id,
            uniqueness: { scope: %i[target_id target_type],
                          status: UsersReport.statuses[:closed],
                          message: 'already made a report' }
end
