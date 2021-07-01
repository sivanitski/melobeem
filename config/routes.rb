require 'sidekiq/web'
require 'sidekiq-scheduler/web'

Rails.application.routes.draw do
  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
    ActiveAdmin.routes(self)
  end
  devise_for :users,
             controllers: {
               omniauth_callbacks: 'users/omniauth_callbacks',
               sessions: 'users/sessions'
             },
             defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post '/check_payment', to: 'webhooks#check_payment'
      put '/users/:entry_id/take_additional_prize', to: 'users#take_additional_prize'

      resources :charges, only: [] do
        collection do
          post :buy_votes
          post :buy_spins
          post :payment_success
        end
      end

      resources :entries, only: %i[index create show new] do
        collection do
          get :current
          get :search
          get :max_level_entry
        end

        member do
          get :total_votes_by_date
          get :voters_by_day
          get :latest_voters
          get :ranking_details
          get :prize_by_level
          get :prizes
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
          get :previous_entries
        end

        collection do
          resources :entries, only: %i[edit update destroy], module: :users
          get :current
          get :show_share_modal
        end
      end

      resources :competitions, only: [] do
        collection do
          get :current
          get :previous_winners
          get :competition_prizes
        end
        member do
          get :previous_awarded
        end
      end

      resources :notifications, only: :index do
        get :unread_present, on: :collection
      end

      resources :spins, only: :create do
        get :check_presence, on: :collection
        get :time_to_free_spin, on: :collection
      end

      resources :products, only: :index
    end
  end

  get '*path', to: 'application#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  root to: 'application#index'
end
