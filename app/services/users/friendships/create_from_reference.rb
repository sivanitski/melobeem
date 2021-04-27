module Users
  module Friendships
    class CreateFromReference
      MINIMAL_PRIZE_FOR_FRIEND = 5

      attr_accessor :user, :referrer

      def initialize(user:, referrer:)
        @user = user
        @referrer = referrer
      end

      def call
        make_friendship_both_ways

        award_with_invitation_prize
      end

      private

      def make_friendship_both_ways
        referrer.external_friends << user

        user.friendships.create(
          friend: referrer,
          invitation_prize: current_prize,
          source_type: :external
        )
      end

      def award_with_invitation_prize
        Prizes::Invitation::AwardAndNotify.new(user: user, referrer: referrer, prize: current_prize).call
      end

      def current_prize
        friends_count.zero? ? MINIMAL_PRIZE_FOR_FRIEND : friends_count * MINIMAL_PRIZE_FOR_FRIEND
      end

      def friends_count
        @friends_count ||= user.external_friends.size
      end
    end
  end
end
