require 'rails_helper'

RSpec.describe Competitions::Finish do
  subject { described_class.new.call(competition) }

  let!(:competition) { create :competition }

  describe '#call' do
    it 'changes competition status from started to finished' do
      subject
      expect(competition.reload.status).to eq('finished')
    end
  end
end
