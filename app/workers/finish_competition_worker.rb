require 'sidekiq-scheduler'

class FinishCompetitionWorker
  include Sidekiq::Worker
  sidekiq_options retry: 1

  def perform
    ActiveRecord::Base.transaction do
      competition = Competition.current!

      Competitions::Finish.new.call(competition)
      Competitions::RewardWinners.new(competition).call
      Competitions::StartNext.new.call
    end
  end
end
