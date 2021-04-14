module Users
  class ShowSerializer < Users::BaseSerializer
    attributes :id, :name, :avatar_url, :current_baby_name

    def current_baby_name
      object.entries.where(competition: Competition.current!).name
    rescue ActiveRecord::RecordNotFound
      nil
    end
  end
end
