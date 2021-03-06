class BaseSerializer < ActiveModel::Serializer
  private

  def image_path(image, options = {})
    return image.imgproxy_url(options) if image.attached?
    return '' if ENV['DEFAULT_IMAGE_PATH'].blank?

    Imgproxy.url_for(ENV['DEFAULT_IMAGE_PATH'])
  end

  def current_country
    instance_options[:country]
  end
end
