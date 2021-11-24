class Event < ApplicationRecord
  enum event_type: { regular: 0, halloween: 1, new_year: 2, black_friday: 3 }

  validates :event_date, presence: true

  def self.today
    Event.find_by(event_date: Time.zone.today)
  end
end
