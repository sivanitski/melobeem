module Notifications
  class CompleteLevel
    attr_reader :entry, :prize, :level

    def initialize(entry:, prize:, level:)
      @entry = entry
      @prize = prize
      @level = level
    end

    def call
      Notification.create!(source_type: :unlock,
                           user: entry.user,
                           entry: entry,
                           payload: payload)
    end

    private

    def payload
      {
        prize: prize,
        level: level
      }
    end
  end
end
