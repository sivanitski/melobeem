module Competitions
  class RewardWithAdditionalPrizes
    attr_reader :competition

    def initialize(competition)
      @competition = competition
    end

    def call
      awarded = competition.entries.where('final_rank <= ? AND not final_rank = ?', 100, 0)
      entries_with_prizes = awarded.each_with_object([]) do |entry, arr|
        prize = ADDITIONAL_PRIZES.detect { |k, _v| k.include? entry.final_rank }&.last
        entry.awards.create(value: prize)
        arr << entry_attrs(entry: entry)
      end

      awarded.upsert_all(entries_with_prizes) # rubocop:disable Rails/SkipsModelValidations
    end

    private

    def entry_attrs(entry:)
      {
        'id' => entry.id, 'user_id' => entry.user_id, 'competition_id' => entry.competition_id,
        'created_at' => entry.created_at, 'updated_at' => entry.updated_at, 'name' => entry.name,
        'total_votes' => entry.total_votes, 'level' => entry.level, 'deactivated' => entry.deactivated,
        'competition_money_prize' => entry.competition_money_prize, 'final_rank' => entry.final_rank
      }
    end
  end
end
