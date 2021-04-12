module Prizes
  class Take
    attr_reader :prize

    def initialize(prize)
      @prize = prize
    end

    def call
      take_prize(prize)
    end

    private

    def take_prize(prize)
      case prize.source_type
      when 'vote' then enroll_votes(prize: prize, value: prize.value)
      when 'spin' then enroll_spins(prize: prize, value: prize.value)
      when 'min'  then enroll_time(prize: prize, value: prize.value)
      end
    end

    def enroll_votes(prize:, value:)
      ActiveRecord::Base.transaction do
        prize.update!(spent: true)
        vote = Vote.create!(value: value, entry: prize.entry, user: prize.entry.user, source_type: :bonus)
        vote.apply!
      end
    end

    def enroll_spins(prize:, value:)
      ActiveRecord::Base.transaction do
        prize.update!(spent: true)
        prize.entry.user.increment!(:premium_spins, value) # rubocop:disable Rails/SkipsModelValidations
      end
    end

    def enroll_time(prize:, value:)
      return if PrizeTime.not_expired.where(entry: prize.entry).any?

      ActiveRecord::Base.transaction do
        prize.update!(spent: true)
        PrizeTime.create!(entry: prize.entry, value: value)
        del_freevote_key(prize)
      end
    end

    def del_freevote_key(prize)
      key = [prize.entry.user.id, prize.entry.id].join(':')
      return unless Redis.current.exists?(key)

      Redis.current.del(key)
    end
  end
end
