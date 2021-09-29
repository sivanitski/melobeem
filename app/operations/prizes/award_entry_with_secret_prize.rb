module Prizes
  class AwardEntryWithSecretPrize
    SECRET_PRIZE = 'timer'.freeze

    attr_reader :entry

    def initialize(entry)
      @entry = entry
    end

    def call
      award_entry(entry)
    end

    private

    def award_entry(entry)
      entry.awards.create(award_type: :time, value: 10, is_secret: true)
    end
  end
end
