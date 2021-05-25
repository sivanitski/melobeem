require 'rails_helper'

RSpec.describe Competitions::PrizesQuery do
  let(:competition) { create :competition }
  let(:rates_exchange) { Psych.load_file('spec/fixtures/currency_rates.json') }
  let(:revenue_percent_in_pounds) { (competition.revenue * 0.015 * rates_exchange['rates']['USD']).floor }
  let!(:prize_in_pounds) { (revenue_percent_in_pounds + competition.prize_cents) }
  let(:country) { ISO3166::Country.new('US') }

  describe '#call' do
    subject { described_class.new(competition: competition, country: country).call }

    it 'returns main prizes' do
      expect(subject[:money_prizes].first[:prize]).to eq prize_in_pounds
      expect(subject[:money_prizes].second[:prize]).to eq 3000
      expect(subject[:money_prizes].last[:prize]).to eq 1500
    end

    it 'returns not_money_prizes keys equal to ADDITIONAL_PRIZES keys' do
      not_money_prizes_keys = subject[:not_money_prizes].each_with_object([]) { |elem, arr| arr << elem.values.first }
      additional_prizes_keys = ADDITIONAL_PRIZES.keys.each_with_object([]) { |key, arr| arr << key.to_a.values_at(0, -1) }
      expect(not_money_prizes_keys).to eq additional_prizes_keys
    end

    it 'returns not_money_prizes values equal to ADDITIONAL_PRIZES values' do
      not_money_prizes_values = subject[:not_money_prizes].each_with_object([]) { |elem, arr| arr << elem.values.last }
      additional_prizes_values = ADDITIONAL_PRIZES.values.each_with_object([]) { |val, arr| arr << val }
      expect(not_money_prizes_values).to eq additional_prizes_values
    end
  end
end
