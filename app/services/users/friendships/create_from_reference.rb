module Users
  module Friendships
    class CreateFromReference
      attr_accessor :user, :referrer

      def initialize(user:, referrer:)
        @user = user
        @referrer = referrer
      end

      def call
        make_friendship_both_ways
      end

      private

      def make_friendship_both_ways
        referrer.friends << user
        user.friends << referrer
      end
    end
  end
end
