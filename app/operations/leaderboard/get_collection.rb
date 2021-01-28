module Leaderboard
  module GetCollection
    def get_collection(page = 0, per = 40, with_details: false)
      if with_details
        leaderboard(page, per).map do |element|
          get_entry_details(element.first).merge('total_votes' => element.last.to_i)
        end
      else
        leaderboard(page, per)
      end
    end

    protected

    def from(page, per)
      page = page.to_i

      return 0 if page.blank?
      return 0 unless page.positive?
      return 0 if page == 1

      (page - 1) * (per.positive? ? per : 1)
    end

    def to(per)
      per = per.to_i

      return 40 if per.blank?
      return 40 unless per.positive?

      per
    end

    def leaderboard(page, per)
      redis.zrevrangebyscore(LEADERBOARD_TAG, '+inf', '0',
                             with_scores: true,
                             limit: [ from(page, per), to(per) ])
    end
  end
end
