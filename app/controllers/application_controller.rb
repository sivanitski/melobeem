class ApplicationController < ActionController::Base
  def index; end

  private

  def authenticate_active_admin_user!
    authenticate_user!

    return if current_user.admin?

    flash[:alert] = 'Unauthorized Access!'
    redirect_to root_path
  end
end
