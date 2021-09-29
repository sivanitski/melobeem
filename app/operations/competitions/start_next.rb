module Competitions
  class StartNext
    PRIZE_CENTS = 10_000

    def call
      Competition.create!(title: Time.now.utc.strftime('%m-%Y'),
                          prize_cents: PRIZE_CENTS,
                          starts_at: DateTime.current,
                          ends_at: (DateTime.current + Competition::DURATION).end_of_day)
    end
  end
end
