module Entries
  class BaseSerializer < ::BaseSerializer
    def username
      object.user.name if object.user.present?
    end

    def image_url
      image_path(object.image, transform_options)
    end

    private

    def load_transformations
      object.transformations.present? ? JSON.parse(object.transformations) : {}
    end

    def transform_options
      transform = load_transformations

      return {} if transform.blank?

      {
        resizing_type: :crop,
        width: transform['width'],
        height: transform['height'],
        gravity: "nowe:#{transform['x']}:#{transform['y']}"
      }
    end
  end
end
