module Entries
  class VotersByDaySerializer < BaseSerializer
    attributes :id, :user_name, :avatar_url, :vote_amount, :source_type

    def avatar_url
      case object.source_type
      when 'user'
        object.user.avatar.attached? ? object.user.avatar.imgproxy_url : ''
      when 'spinner', 'bonus'
        nil
      end
    end
  end
end
