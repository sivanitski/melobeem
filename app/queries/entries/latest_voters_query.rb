module Entries
  class LatestVotersQuery
    def call(entry)
      User.select('*')
          .from(User.joins(:votes)
                    .select('distinct on (users.id) users.*, votes.created_at as vote_created_at')
                    .where(votes: { entry: entry })
                    .order('users.id, votes.created_at desc'))
          .order('vote_created_at desc')
          .limit(10)
    end
  end
end
