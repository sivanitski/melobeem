module Competitions
  class PreviousWinnersSerializer < BaseSerializer
    attributes :id, :name, :image_url, :competition_month, :entries_quantity, :prize

    def competition_month
      object.starts_at.strftime('%B')
    end

    def image_url
      object.image.attached? ? object.image.imgproxy_url : ''
    end

    def entries_quantity
      object.entries_count
    end

    def prize
      object.prize_cents
    end
  end
end
