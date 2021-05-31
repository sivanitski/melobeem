module API
  module V1
    module Entries
      class VotesController < API::V1::ApplicationController
        before_action :verify_v3_captcha, only: :create_free

        def expiration_time_for_free
          uniq_key = [current_user.id, entry.id].join(':')
          ttl = [0, Redis.current.ttl(uniq_key)].max

          render json: { ttl_in_seconds: ttl }
        end

        def create_free
          result = Votes::Create.new.call(params: vote_params.merge(fingerprint: fingerprint))

          case result
          when Success
            render json: result.value, status: :created
          else
            render json: { message: result.error }, status: :unprocessable_entity
          end
        end

        private

        def entry
          @entry ||= competition.entries.find(params[:entry_id])
        end

        def vote_params
          params.permit(:entry_id, :value, :user_id)
        end

        def fingerprint
          @fingerprint ||= Fingerprint.call(request)
        end

        def verify_v3_captcha
          return if current_user.captcha_verified

          success = verify_recaptcha(action: 'create_free', minimum_score: 0.3, secret_key: ENV['RECAPTCHA_SECRET_KEY'])

          current_user.update(captcha_verified: true) if success

          return if success

          checkbox_success = verify_recaptcha

          current_user.update(captcha_verified: true) if checkbox_success

          render json: { message: 'Sorry, you need to pass recaptcha before voting' }, status: :locked unless checkbox_success
        end
      end
    end
  end
end
