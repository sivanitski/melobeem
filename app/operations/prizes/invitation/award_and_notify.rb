module Prizes
  module Invitation
    class AwardAndNotify
      attr_reader :user, :referrer, :vote, :prize

      def initialize(user:, referrer:, prize:)
        @user = user
        @referrer = referrer
        @prize = prize
      end

      def call
        return Failure.new('User has no current entry') if current_entry.blank?

        award_entry_with_votes

        notify_user
      rescue StandardError => e
        Failure.new("Awarding with prize failed: #{e}")
      end

      private

      def current_entry
        user.entries.where(competition: Competition.current!).first
      rescue ActiveRecord::RecordNotFound
        nil
      end

      def award_entry_with_votes
        ActiveRecord::Base.transaction do
          @vote = Vote.create!(
            value: prize,
            entry_id: current_entry.id,
            user: user,
            source_type: :invitation,
            invited_user_id: referrer.id
          )
          vote.apply!
        end
      end

      def notify_user
        Notifications::Invitation.new(vote: vote, referrer: referrer).call
      end
    end
  end
end
