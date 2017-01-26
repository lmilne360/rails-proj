Rails.application.routes.draw do
  root 'links#index'
  
  resources :links do 
    resources :comments
  end

  devise_for :users, skip: [:sessions]
  	as :user do 
  		get 'login' => 'devise/sessions#new', as: :new_user_session
  		post 'login' => 'devise/sessions#create', as: :user_session
  		delete 'logout' => 'devise/sessions#destroy', as: :destroy_user_session
  	end
    devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
    
  resources :comments
  resources :users, only: [:show]


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
