require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_many(:entries).dependent(:nullify) }
  it { is_expected.to have_many(:votes).dependent(:nullify) }
  it { is_expected.to have_many(:purchase_transactions).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:provider) }
  it { is_expected.to validate_presence_of(:name) }
end
