require 'rails_helper'
require 'stripe_mock'

describe Votes::Buy do
  let(:result) { described_class.new.call(params: { entry_id: entry.id, vote_value: '50' }, user: entry.user) }

  it_behaves_like 'Buy operation'
end
