module Entries
  class SearchEntriesQuery
    def call(search_line)
      return Entry.none if search_line.empty?

      Entry.with_attached_image
           .preload(:user)
           .where(competition: Competition.current!)
           .where("name like '#{search_line}%' OR lower(name) like '#{search_line}%'")
    end
  end
end
