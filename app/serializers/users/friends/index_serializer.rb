module Users
  module Friends
    class IndexSerializer < Users::BaseSerializer
      attributes :id, :name, :avatar_url, :source_type, :invitation_prize, :current_baby_name
    end
  end
end
