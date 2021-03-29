module Notifications
  class Buy
    attr_reader :vote

    def initialize(vote)
      @vote = vote
    end

    def call
      Notification.create!(text: "You bought #{vote.value} votes",
                           source_type: :purchase,
                           user: vote.user,
                           entry: vote.entry)
    end
  end
end
