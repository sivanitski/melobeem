require 'rails_helper'

RSpec.describe Competition, type: :model do
  it { is_expected.to have_many(:entries).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:title) }
end
