require 'rails_helper'

RSpec.describe PrizeTime, type: :model do
  it { is_expected.to belong_to :entry }

  it { is_expected.to validate_presence_of(:value) }
  it { is_expected.to validate_presence_of(:entry_id) }
end
