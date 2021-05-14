require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe FinishCompetitionWorker, type: :worker do
  before { create :competition }

  it { is_expected.to be_processed_in :default }
  it { is_expected.to be_retryable 1 }

  it 'has enqueued sidekiq job' do
    time = Time.zone.now.beginning_of_month.next_month
    described_class.perform_at time, 'Finish', true
    expect(described_class).to have_enqueued_sidekiq_job('Finish', true).at(time)
  end

  it 'adds job on to the queue' do
    expect do
      described_class.perform_async
    end.to change(described_class.jobs, :size).by(1)
  end
end
