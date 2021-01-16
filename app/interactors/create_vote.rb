class CreateVote
  include Interactor

  TIME_BETWEEN_VOTING = 600_000

  def call
    return { vote_after: Redis.current.ttl(@uniq_key) }.to_json if Redis.current.exists(@uniq_key)

    vote = Vote.new(context.params)

    if vote.save
      create_uniq_vote_key
      context.vote = vote
    else
      context.fail!(errors: vote.errors)
    end
  end

  private

  def create_uniq_vote_key
    @uniq_key = context.params[:user_id].to_s + context.params[:entry_id].to_s
    Redis.current.psetex(@uniq_key, TIME_BETWEEN_VOTING, @uniq_key)
  end
end
