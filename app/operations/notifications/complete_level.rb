module Notifications
  class CompleteLevel
    PRIZES = ['1 Vote', '10 Votes', '5 Spins', '1 Spin', '10 Spins', 'Time 10 min', 'Time 20 min', 'Time 30 min'].freeze

    attr_reader :entry

    def initialize(entry)
      @entry = entry
    end

    def call
      Notification.create!(source_type: :unlock,
                           user: entry.user,
                           entry: entry,
                           payload: payload(entry))
    end

    private

    def payload(entry)
      {
        prize: PRIZES.sample,
        level: entry.level
      }
    end
  end
end
