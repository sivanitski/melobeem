module Users
  class ShowSerializer < Users::BaseSerializer
    attributes :id, :name, :avatar_url, :current_baby_name
    attribute :friends_with_current_user?, if: :friends_with_current_user?
    attribute :friendship_source_type,     if: :friends_with_current_user?
    attribute :captcha_verified,           if: :current_user?

    def friends_with_current_user?
      return false unless current_user

      current_user_friendship.present?
    end

    def friendship_source_type
      current_user_friendship.source_type
    end

    def current_baby_name
      object.entries.where(competition: Competition.current!).first&.name
    rescue ActiveRecord::RecordNotFound
      nil
    end

    def current_user?
      current_user.eql?(object)
    end

    private

    def current_user_friendship
      @current_user_friendship ||= Friendship.find_by(user: current_user, friend: object)
    end
  end
end
