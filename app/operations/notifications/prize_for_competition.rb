module Notifications
  class PrizeForCompetition
    attr_reader :prize, :entry

    def initialize(prize:, entry:)
      @prize = prize
      @entry = entry
    end

    def call
      Notification.create!(source_type: :bonus,
                           user: entry.user,
                           entry: entry,
                           payload: payload)
    end

    private

    def payload
      {
        prize: prize,
        competition: entry.competition.title
      }
    end
  end
end
