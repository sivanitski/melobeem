module Users
  class Deactivate
    def initialize(user)
      @user = user
    end

    def call
      deactivate_user
      deactivate_entries
      delete_free_votes_from_entries
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

    def delete_free_votes_from_entries
      entries = Entry.where(id: user.votes.where(source_type: :user).pluck(:entry_id).uniq)

      entries.each do |entry|
        user_votes = entry.votes.where(source_type: :user, user: user)

        entry.update_column(:total_votes, entry.total_votes - user_votes.sum(:value))

        user_votes.destroy_all
      end
    end
    # rubocop:enable Rails/SkipsModelValidations
  end
end
