module Entries
  class PrizeByLevelSerializer < ::BaseSerializer
    attributes :id, :level, :entry_id, :spent, :source_type, :value
  end
end
