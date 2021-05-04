module Competitions
  class Finish
    def call(competition)
      competition.update!(status: :finished)
      Entries::UpdateFinalRankQuery.new.call(competition.id)
    end
  end
end
