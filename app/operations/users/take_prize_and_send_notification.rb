module Users
  class TakePrizeAndSendNotification
    def call(prize:, entry:)
      ActiveRecord::Base.transaction do
        Notifications::PrizeForCompetition.new(prize: prize, entry: entry).call
        entry.user.increment!(:premium_spins, prize) # rubocop:disable Rails/SkipsModelValidations
        entry.update!(spent_competition_additional_prize: true)
      end
    end
  end
end
