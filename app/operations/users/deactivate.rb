module Users
  class Deactivate
    def initialize(user)
      @user = user
    end

    def call
      deactivate_user
      deactivate_entries
    end

    private

    attr_reader :user

    # rubocop:disable Rails/SkipsModelValidations
    def deactivate_user
      user.update_columns(deactivated: true,
                          name: Digest::MD5.hexdigest(user.name),
                          email: Digest::MD5.hexdigest(user.email),
                          updated_at: Time.zone.now)
    end

    def deactivate_entries
      user.entries.update_all(deactivated: true, total_votes: 0, updated_at: Time.zone.now)
    end
    # rubocop:enable Rails/SkipsModelValidations
  end
end
