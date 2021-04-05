require 'rails_helper'
require 'stripe_mock'

describe Spins::Buy do
  let(:result) { described_class.new.call(params: { value: '10' }, user: entry.user) }

  it_behaves_like 'Buy operation'
end
