module Entries
  class VotersByDaySerializer < BaseSerializer
    attributes :id, :user_name, :avatar_url, :vote_amount, :source_type

    def avatar_url
      case object.source_type
      when 'user'
        object.user.avatar.attached? ? rails_blob_url(object.user.avatar) : ''
      when 'spinner', 'bonus'
        nil
      end
    end
  end
end
