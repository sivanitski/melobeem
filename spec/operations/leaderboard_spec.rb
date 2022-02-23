require 'rails_helper'

RSpec.describe Leaderboard do
  subject { described_class.new(redis: redis, namespace: namespace) }

  let(:redis) { Redis.current }
  let(:namespace) { 'ns' }

  before do
    # adding records to redis sorted set via running zadd over the array of [score, id] tuples
    # resulting in entries with ids: 1,2,3 with the corresponding scores: 2,4,6

    redis.zadd(namespace, [[2, 1], [4, 2], [6, 3]])
  end

  describe '#get' do
    it 'returns all records sorted by score' do
      expect(subject.get).to eq [['3', 6.0], ['2', 4.0], ['1', 2.0]]
    end

    context 'when min, max args are passed to the method' do
      it 'scopes query by score' do
        expect(subject.get(min: 1, max: 5)).to eq [['2', 4.0], ['1', 2.0]]
        expect(subject.get(max: 3)).to eq [['1', 2.0]]
        expect(subject.get(min: 3)).to eq [['3', 6.0], ['2', 4.0]]
      end
    end

    context 'when limit, offset args are passed to the method' do
      it 'scopes query by these pagination args' do
        expect(subject.get(limit: 1, offset: 1)).to eq [['2', 4.0]]
        expect(subject.get(limit: 2)).to eq [['3', 6.0], ['2', 4.0]]
        expect(subject.get(offset: 1)).to eq [['2', 4.0], ['1', 2.0]]
      end
    end
  end

  describe '#add_entry' do
    context 'when not existing id is passed to the method' do
      it 'adds record to the sorted set' do
        expect(subject.add_entry(4)).to eq 1
      end
    end

    context 'when existing id is passed to the method' do
      it 'does not add record to the sorted set' do
        expect(subject.add_entry(1)).to eq 0
      end
    end
  end

  describe '#delete_entry' do
    context 'when existing id is passed to the method' do
      it 'deletes record from the sorted set' do
        expect(subject.delete_entry(1)).to eq true
      end
    end

    context 'when not existing id is passed to the method' do
      it 'does not delete record from the sorted set' do
        expect(subject.delete_entry(4)).to eq false
      end
    end
  end

  describe '#increment_entry_score' do
    context 'when existing id is passed to the method' do
      it 'increments score of the record from the sorted set by passed value' do
        expect(subject.increment_entry_score(3, 4)).to eq 10
      end
    end

    context 'when non existing id is passed to the method' do
      it 'does not add record to the sorted set with passed value' do
        expect(subject.increment_entry_score(4, 4)).to eq nil
      end
    end
  end

  describe '#decrement_entry_score' do
    context 'when existing id is passed to the method' do
      it 'decrements score of the record from the sorted set by passed value' do
        expect(subject.decrement_entry_score(3, 4)).to eq 2
      end
    end

    context 'when non existing id is passed to the method' do
      it 'does not add record to the sorted set with passed value' do
        expect(subject.decrement_entry_score(4, 4)).to eq nil
      end
    end
  end
end
