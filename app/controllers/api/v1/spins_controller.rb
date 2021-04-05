module API
  module V1
    class SpinsController < API::V1::ApplicationController
      def create
        result = Spins::Create.new(current_user).call

        case result
        when Success
          render json: result.value, status: :created
        else
          render json: { message: result.error }, status: :not_found
        end
      end
    end
  end
end
