module Competitions
  class Finish
    def call(competition)
      competition.update!(status: :finished)
    end
  end
end
