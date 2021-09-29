module Users
  class TakeAward
    attr_reader :award, :entry

    def initialize(award, entry)
      @award = award
      @entry = entry
    end

    def call
      case award.award_type
      when 'spinner'
        take_spinner
      when 'time'
        take_time
      end
    end

    private

    def take_spinner
      ActiveRecord::Base.transaction do
        Notifications::PrizeForCompetition.new(prize: award.value, entry: entry).call
        award.update!(claimed: true, claimed_at: Time.current)
        entry.user.increment!(:premium_spins, award.value) # rubocop:disable Rails/SkipsModelValidations
      end
    end

    def take_time
      return if PrizeTime.not_expired.where(entry: entry).any?

      ActiveRecord::Base.transaction do
        award.update!(claimed: true, claimed_at: Time.current)
        PrizeTime.create!(entry: entry, value: award.value)
        del_freevote_key
      end
    end

    def del_freevote_key
      key = [entry.user.id, entry.id].join(':')
      return unless Redis.current.exists?(key)

      Redis.current.del(key)
    end
  end
end
