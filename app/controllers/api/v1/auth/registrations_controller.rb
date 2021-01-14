module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        def sign_up_params
          params.require(:user).permit(:email, :password, :name)
        end
      end
    end
  end
end
