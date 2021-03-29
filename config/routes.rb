Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               omniauth_callbacks: 'users/omniauth_callbacks',
               sessions: 'users/sessions'
             },
             defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/check_payment_status', to: 'webhooks#check_payment_status'

      resources :charges, only: :create

      resources :entries, only: %i[index create show] do
        collection do
          get 'current'
          get 'search'
          get 'vote_prices'
        end

        member do
          get :total_votes_by_date
          get :voters_by_day
          get :latest_voters
          get :ranking_details
        end

        resources :votes, module: :entries, only: [] do
          get 'expiration_time_for_free', on: :collection
          post 'create_free', on: :collection
        end
      end

      resources :users, only: :show do
        member do
          get :entries
          get :friends
          delete :deactivate
        end
        collection do
          resources :entries, only: %i[edit update destroy], module: :users
          get :current
        end
      end

      resources :competitions, only: [] do
        collection do
          get :current
          get :previous_winners
        end
      end

      resources :notifications, only: :index
    end
  end

  get '*path', to: 'application#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  root to: 'application#index'
end
