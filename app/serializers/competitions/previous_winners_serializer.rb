module Competitions
  class PreviousWinnersSerializer < BaseSerializer
    attributes :id, :title, :prize_cents, :starts_at, :entries_count, :winner_id, :winner_image_url

    def winner_image_url
      entry_image = instance_options[:entry_images].find { |e| e.id == object.winner_id }
      image_path(entry_image.image)
    end
  end
end
