Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "main#index"

  delete '/todos', to: 'todos#destroy_completed'
  patch '/todos/toggle-all', to: 'todos#toggle_all'
  resources :todos
end
