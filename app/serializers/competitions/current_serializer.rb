module Competitions
  class CurrentSerializer < BaseSerializer
    attributes :id, :ends_at, :prize_cents, :created_at
  end
end
