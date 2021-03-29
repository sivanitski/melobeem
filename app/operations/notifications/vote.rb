module Notifications
  class Vote
    attr_reader :vote

    def initialize(vote)
      @vote = vote
    end

    def call
      Notification.create!(text: "You voted for #{vote.entry.name}",
                           source_type: :vote,
                           user: vote.user,
                           entry: vote.entry)
    end
  end
end
