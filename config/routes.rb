Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               omniauth_callbacks: 'users/omniauth_callbacks',
               sessions: 'users/sessions'
             },
             defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/check_votes_payment', to: 'webhooks#check_votes_payment'
      post '/check_spins_payment', to: 'webhooks#check_spins_payment'

      resources :charges, only: [] do
        collection do
          post :buy_votes
          post :buy_spins
        end
      end

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
          get :prize_by_level
          get :prize_time
          put :take_prize
        end

        resources :votes, module: :entries, only: [] do
          get 'expiration_time_for_free', on: :collection
          post 'create_free', on: :collection
        end
      end

      resources :users, only: :show do
        resources :friends, only: %i[index], module: :users do
          post :add_friend, on: :collection
        end

        member do
          get :entries
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

      resources :spins, only: :create
    end
  end

  get '*path', to: 'application#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  root to: 'application#index'
end
