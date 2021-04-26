require 'rails_helper'

RSpec.describe PurchaseTransaction, type: :model do
  it { is_expected.to belong_to :user }
  it { is_expected.to belong_to :entry }
  it { is_expected.to belong_to :competition }

  it { is_expected.to validate_presence_of(:user_id) }
  it { is_expected.to validate_presence_of(:entry_id) }
  it { is_expected.to validate_presence_of(:competition_id) }
end
