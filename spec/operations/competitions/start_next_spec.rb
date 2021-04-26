require 'rails_helper'

RSpec.describe Competitions::StartNext do
  subject { described_class.new.call }

  describe '#call' do
    it 'creates new competition' do
      expect { subject }.to change(Competition, :count).by(1)
    end

    context 'when tries create the same competition' do
      before { subject }

      it 'does not create new competition' do
        expect { subject }.not_to change(Competition, :count)
      end
    end
  end
end
