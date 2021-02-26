class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: ENV['STAGING_NAME'], password: ENV['STAGING_PASS'] if Rails.env.production?

  def index; end
end
