module Votes
  class Create
    TIME_BETWEEN_VOTING = 600

    def call(params:)
      @params = params
      return Success.new({ ttl: current_ttl }) if key_exists?

      vote = Vote.new(params)
      if vote.save
        create_uniq_vote_key
        Success.new({ ttl: TIME_BETWEEN_VOTING })
      else
        Failure.new(vote.errors)
      end
    end

    private

    def key_exists?
      Redis.current.exists(uniq_key)
    end

    def current_ttl
      Redis.current.ttl(uniq_key)
    end

    def uniq_key
      @uniq_key ||= [ @params[:user_id], @params[:entry_id] ].join(':')
    end

    def create_uniq_vote_key
      Redis.current.setex(uniq_key, TIME_BETWEEN_VOTING, uniq_key)
    end
  end
end
