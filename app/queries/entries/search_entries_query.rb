module Entries
  class SearchEntriesQuery
    attr_accessor :competition

    def call(search_line)
      return Entry.none if search_line.empty?

      ::Entries::WithRankQuery.new.call(Competition.current!.id)
                              .where("name like '#{search_line}%' OR lower(name) like '#{search_line}%'")
    end
  end
end
