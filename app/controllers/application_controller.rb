class ApplicationController < ActionController::Base
  before_action :authenticate

  def index; end

  private

  def authenticate
    http_basic_authenticate_or_request_with name: ENV['STAGING_NAME'], password: ENV['STAGING_PASS'] if Rails.env.production?
  end
end
