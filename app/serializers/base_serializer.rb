class BaseSerializer < ActiveModel::Serializer
  private

  def image_path(image)
    return image.imgproxy_url if image.attached?
    return '' if ENV['DEFAULT_IMAGE_PATH'].blank?

    Imgproxy.url_for(ENV['DEFAULT_IMAGE_PATH'])
  end
end
