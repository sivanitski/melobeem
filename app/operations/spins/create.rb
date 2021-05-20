module Spins
  class Create
    VALUES_FREE = [1, 3, 2, 0, 1, 4, 1, 2].freeze
    VALUES_PAID = [1, 3, 2, 4, 1, 4, 1, 2].freeze

    def initialize(user)
      @user = user
    end

    def call
      if can_spin?(user)
        Success.new({ value: apply_spin(user) })
      else
        Failure.new({ error: 'No spin' })
      end
    end

    attr_reader :user

    private

    def can_spin?(user)
      can_free_spin?(user) || can_paid_spin?(user)
    end

    def can_free_spin?(user)
      user.spins.free.where(created_at: Date.current.all_day).empty?
    end

    def can_paid_spin?(user)
      user.premium_spins.positive?
    end

    def spin_value(user)
      can_paid_spin?(user) ? VALUES_PAID.sample : VALUES_FREE.sample
    end

    def apply_spin(user)
      entry = Competition.current!.entries.find_by(user: user)
      spin = Spin.new(user: user, value: spin_value(user), paid: can_paid_spin?(user))
      vote = Vote.new(user: user, value: spin.value, entry: entry, source_type: 'spinner')

      ActiveRecord::Base.transaction do
        spin.save!
        vote.save!
        vote.apply!
      end

      spin.value
    end
  end
end
