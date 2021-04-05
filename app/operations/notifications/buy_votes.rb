module Notifications
  class BuyVotes
    attr_reader :vote

    def initialize(vote)
      @vote = vote
    end

    def call
      Notification.create!(source_type: :purchase,
                           user: vote.user,
                           entry: vote.entry,
                           payload: payload(vote))
    end

    private

    def user_entry?(vote)
      vote.user.entries.ids.include?(vote.entry.id)
    end

    def payload(vote)
      {
        votes: vote.value,
        user_entry: user_entry?(vote)
      }
    end
  end
end
