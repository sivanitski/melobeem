class ApplicationController < ActionController::Base
  def index
    @page_title = 'Melobeem'
    @page_description = 'Melobeem is a free photo contest for Babies up to 4 years!'
    @page_url = 'https://melobeem.com'
    @page_image = 'https://melobeem.com/packs/media/images/header-left@2x-6af68b616d0a0f21e7e2bbb8849d883e.png'
  end

  private

  def authenticate_active_admin_user!
    authenticate_user!

    return if current_user.admin?

    flash[:alert] = 'Unauthorized Access!'
    redirect_to root_path
  end
end
