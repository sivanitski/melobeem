class Leaderboard
  def initialize(redis: Redis.current, namespace: :leaderboard)
    @redis = redis
    @namespace = namespace
  end

  def get(min: 0, max: '+inf', limit: -1, offset: 0)
    redis.zrevrangebyscore(namespace, max, min, limit: [offset, limit], with_scores: true)
  end

  def add_entry(entry_id)
    redis.zadd(namespace, [0, entry_id], nx: true)
  end

  def delete_entry(entry_id)
    redis.zrem(namespace, entry_id)
  end

  def increment_entry_score(entry_id, value)
    redis.zadd(namespace, [value, entry_id], xx: true, incr: true)
  end

  def decrement_entry_score(entry_id, value)
    increment_entry_score(entry_id, -value)
  end

  private

  attr_reader :redis, :namespace
end
