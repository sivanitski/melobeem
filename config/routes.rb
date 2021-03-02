Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' },
                     defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/check_payment_status', to: 'webhooks#check_payment_status'

      resources :charges, only: :create

      resources :entries, only: %i[index create show] do
        collection do
          get 'current'
          get 'search'
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
        get :user_entries, on: :member
        collection do
          resources :entries, only: %i[edit update destroy], module: :users
        end
      end

      resources :competitions, only: [] do
        get 'current', on: :collection
      end
    end
  end

  get '*path', to: 'application#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  root to: 'application#index'
end
