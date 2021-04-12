require 'rails_helper'

RSpec.describe Prize, type: :model do
  it { is_expected.to belong_to :entry }

  it { is_expected.to validate_presence_of(:level) }
  it { is_expected.to validate_presence_of(:entry_id) }

  context 'when all prizes from prizes.json included to Prize source_type enum' do
    it 'includes all types of source_type' do
      expect(described_class.source_types.keys - PRIZES.each_with_object([]) { |elem, arr| arr << elem['source_type'] }.uniq).to eq []
      expect(described_class.source_types.values - PRIZES.each_with_object([]) { |elem, arr| arr << elem['source_type'] }.uniq).to eq []
    end
  end
end
