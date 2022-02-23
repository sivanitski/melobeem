require 'rails_helper'

RSpec.describe Competition, type: :model do
  it { is_expected.to have_many(:entries).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:prize_cents) }
  it { is_expected.to validate_presence_of(:starts_at) }
  it { is_expected.to validate_presence_of(:ends_at) }
end
