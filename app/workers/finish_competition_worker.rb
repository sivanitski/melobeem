require 'sidekiq-scheduler'

class FinishCompetitionWorker
  include Sidekiq::Worker
  sidekiq_options retry: 1

  def perform
    ActiveRecord::Base.transaction do
      competition = Competition.current!

      Competitions::RewardWinners.new(competition).call
      Competitions::Finish.new.call(competition)
      Competitions::StartNext.new.call
    end
  end
end
