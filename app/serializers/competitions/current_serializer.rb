module Competitions
  class CurrentSerializer < BaseSerializer
    attributes :id, :ends_at, :prize_cents, :created_at, :prize_currency

    def prize_cents
      instance_options[:prize_summary]
    end

    def prize_currency
      instance_options[:prize_currency]
    end
  end
end
