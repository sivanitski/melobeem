module Entries
  class VotersByDaySerializer < BaseSerializer
    attributes :user_name, :avatar_url, :vote_amount, :source_type, :user_id,
               :invited_user_id, :invited_user_name, :invited_user_avatar_url,
               :vote_date

    def avatar_url
      return nil unless object.source_type.eql?('user')

      image_path(object.user.avatar)
    end

    def invited_user_avatar_url
      return nil unless object.source_type.eql?('invitation')

      image_path(object.invited_user.avatar)
    end
  end
end
