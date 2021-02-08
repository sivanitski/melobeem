Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/check_payment_status', to: 'webhooks#check_payment_status'

      resources :votes, only: :create
      resources :charges, only: :create

      resources :competitions, only: [] do
        resources :entries, only: %i[index create show], module: :competitions do
          get 'latest_voters', on: :member
        end
      end

      resources :users, only: [] do
        collection do
          resources :entries, only: %i[edit update destroy], module: :users
        end
      end
    end
  end

  get '*path', to: 'application#index'
  root to: 'application#index'
end
