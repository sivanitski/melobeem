require 'rails_helper'

RSpec.describe Entry, type: :model do
  it { is_expected.to have_many(:votes).dependent(:destroy) }
  it { is_expected.to belong_to :competition }
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:gender) }
end
