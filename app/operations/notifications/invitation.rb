module Notifications
  class Invitation
    attr_reader :vote, :referrer

    def initialize(vote:, referrer:)
      @vote = vote
      @referrer = referrer
    end

    def call
      Notification.create(
        source_type: :invitation,
        user: vote.user,
        entry: vote.entry,
        payload: payload
      )
    end

    private

    def payload
      {
        prize: vote.value,
        referrer: referrer
      }
    end
  end
end
