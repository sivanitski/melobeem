require 'sidekiq-scheduler'

class ClearEntriesWithoutUsersWorker
  include Sidekiq::Worker
  sidekiq_options retry: 1

  def perform
    Entry.where(user_id: nil).destroy_all
  end
end
