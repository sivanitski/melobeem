module Awards
  class IndexSerializer < ::BaseSerializer
    attributes :id, :is_secret, :award_type, :value, :entry_id
  end
end
