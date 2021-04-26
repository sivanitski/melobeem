module Competitions
  class StartNext
    PRIZE_CENTS = 10_000

    def call
      Competition.create!(title: Time.now.utc.strftime('%m-%Y'),
                          prize_cents: PRIZE_CENTS,
                          starts_at: DateTime.now.utc.beginning_of_month,
                          ends_at: DateTime.now.utc.end_of_month)
    end
  end
end
