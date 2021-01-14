class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  def index; end
end
