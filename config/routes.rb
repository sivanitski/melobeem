Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions'
      }

      post '/check_payment_status', to: 'webhooks#check_payment_status'

      resources :votes, only: :create
      resources :charges, only: :create

      resources :competitions, only: [] do
        resources :entries, only: %i[index create show], module: :competitions
      end

      resources :users, only: [] do
        collection do
          resources :entries, only: %i[edit update destroy], module: :users
        end
      end
    end
  end
  get '*path', to: 'application#index'
end
