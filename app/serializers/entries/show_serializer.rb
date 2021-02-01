module Entries
  class ShowSerializer < ActiveModel::Serializer
    attributes :id, :gender, :image_url, :links, :rank

    def image_url
      object.image.present? ? object.image.url : ''
    end

    def links
      [
        next: next_entry,
        previous: previous_entry
      ]
    end

    def rank
      current_entry.first[:rank]
    end

    private

    def current_entry
      near_entries.select { |el| el[:direction] == 'current' }
    end

    def next_entry
      near_entries.select { |el| el[:direction] == 'next' }
    end

    def previous_entry
      near_entries.select { |el| el[:direction] == 'previous' }
    end

    def near_entries
      @near_entries ||= Leaderboard::Actions.get_near_entries(object.id)
    end
  end
end
