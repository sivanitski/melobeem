module Votes
  class Create
    TIME_BETWEEN_VOTING = 2400

    def call(params:) # rubocop:disable Metrics/MethodLength
      @params = params
      return Success.new({ ttl_in_seconds: current_ttl }) if key_exists?

      vote = Vote.new(params)
      ActiveRecord::Base.transaction do
        vote.save!
        vote.apply!
      end

      create_uniq_vote_key

      Success.new({ ttl_in_seconds: TIME_BETWEEN_VOTING })
    rescue ActiveRecord::ActiveRecordError => e
      Failure.new(e.message)
    end

    private

    def key_exists?
      Redis.current.exists?(uniq_key)
    end

    def current_ttl
      Redis.current.ttl(uniq_key)
    end

    def uniq_key
      @uniq_key ||= [@params[:user_id], @params[:entry_id]].join(':')
    end

    def create_uniq_vote_key
      Redis.current.setex(uniq_key, TIME_BETWEEN_VOTING, uniq_key)
    end
  end
end
