require 'rails_helper'

RSpec.describe Competitions::Finish do
  subject { described_class.new.call(competition) }

  let!(:competition) { create :competition }
  let(:entry_first) { create :entry, competition: competition, total_votes: 25 }
  let(:entry_second) { create :entry, competition: competition, total_votes: 20 }

  describe '#call' do
    it 'changes competition status from started to finished' do
      subject
      expect(competition.reload.status).to eq('finished')
    end

    it 'changes final rank of each entry' do # rubocop:disable RSpec/ExampleLength
      expect do
        subject
        entry_first.reload
        entry_second.reload
      end.to change(entry_first.reload, :final_rank).from(0).to(1)
                                                    .and change(entry_second.reload, :final_rank).from(0).to(2)
    end
  end
end
