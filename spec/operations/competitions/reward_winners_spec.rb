require 'rails_helper'

RSpec.describe Competitions::RewardWinners do
  subject { described_class.new(competition).call }

  let(:competition) { create :competition }
  let(:users) { create_list :user, 4 }
  let(:rates_exchange) { Psych.load_file('spec/fixtures/currency_rates.json') }
  let(:revenue_percent_in_dollars) { (competition.revenue * 0.015 / rates_exchange['rates']['GBP']).floor }
  let(:prize_in_dollars) { (revenue_percent_in_dollars + competition.prize_cents) }

  describe '#call' do
    let!(:first_place_entry) { create :entry, user: users[0], total_votes: 30, competition: competition }
    let!(:second_place_entry) { create :entry, user: users[1], total_votes: 25, competition: competition }
    let!(:third_place_entry) { create :entry, user: users[2], total_votes: 20, competition: competition }
    let!(:fourth_place_entry) { create :entry, user: users[3], total_votes: 10, competition: competition }

    context 'when the prizewinners have a different number of votes' do
      it 'changes field competition_money_prize for the first winner' do
        expect do
          subject
          first_place_entry.reload
        end.to change(first_place_entry.reload, :competition_money_prize).from(0).to(prize_in_dollars)
      end

      it 'changes field competition_money_prize for the second winner' do
        expect do
          subject
          second_place_entry.reload
        end.to change(second_place_entry.reload, :competition_money_prize).from(0).to(3000)
      end

      it 'changes field competition_money_prize for the third winner' do
        expect do
          subject
          third_place_entry.reload
        end.to change(third_place_entry.reload, :competition_money_prize).from(0).to(1500)
      end

      it 'does not change field competition_money_prize for the fourth place entry' do
        expect do
          subject
          fourth_place_entry.reload
        end.not_to change(third_place_entry.reload, :competition_money_prize)
      end
    end

    context 'when two prizewinners have the same number of votes for 2 and 3 place' do
      before { third_place_entry.update!(total_votes: second_place_entry.total_votes) }

      it 'changes field competition_money_prize for the first winner' do
        expect do
          subject
          first_place_entry.reload
        end.to change(first_place_entry.reload, :competition_money_prize).from(0).to(prize_in_dollars)
      end

      it 'changes field competition_money_prize for second and third places for the identical value' do # rubocop:disable RSpec/ExampleLength
        expect do
          subject
          second_place_entry.reload
          third_place_entry.reload
        end.to change(second_place_entry.reload, :competition_money_prize).from(0).to(2250)
                                                                          .and change(third_place_entry.reload, :competition_money_prize).from(0).to(2250)
      end

      it 'does not change field competition_money_prize for the fourth place entry' do
        expect do
          subject
          fourth_place_entry.reload
        end.not_to change(third_place_entry.reload, :competition_money_prize)
      end
    end

    context 'when all three prizewinners have the same number of votes' do
      before do
        second_place_entry.update!(total_votes: first_place_entry.total_votes)
        third_place_entry.update!(total_votes: second_place_entry.total_votes)
      end

      it 'amount of the prize fund is divided equally among the three prizewinners' do # rubocop:disable RSpec/ExampleLength
        expect do
          subject
          first_place_entry.reload
          second_place_entry.reload
          third_place_entry.reload
        end.to change(first_place_entry.reload, :competition_money_prize).from(0).to(5527)
                                                                         .and change(second_place_entry.reload, :competition_money_prize).from(0).to(5527)
                                                                                                                                         .and change(
                                                                                                                                           second_place_entry.reload, :competition_money_prize # rubocop:disable Layout/LineLength
                                                                                                                                         ).from(0).to(5527)
      end
    end
  end
end
