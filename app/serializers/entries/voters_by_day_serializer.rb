module Entries
  class VotersByDaySerializer < BaseSerializer
    attributes :user_name, :avatar_url, :vote_amount, :source_type, :user_id

    def avatar_url
      return nil unless object.source_type == 'user'

      image_path(object.user.avatar)
    end
  end
end
