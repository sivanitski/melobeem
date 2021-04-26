FactoryBot.define do
  factory :purchase_transaction do
    intent_id { 'pi_00000000000000' }
    amount { 1000 }
    amount_received { 0 }
    status { :process }
    value { 10 }

    user
    entry
    competition
  end
end
