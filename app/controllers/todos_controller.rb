class TodosController < ApplicationController
  before_action :set_todo, only: [:destroy, :update]
  def index
    @todos = Todo.all
    render json: @todos.as_json(only: [:id, :content], methods: :isCompleted)
  end

  def create
    @todo = Todo.create content: params[:content]
    render json: { id: @todo.id }
  end

  def update
    if (params.key?(:is_completed))
      @todo.update(is_completed: params[:is_completed])
    elsif (params.key?(:content))
      @todo.update(content: params[:content])
    end
  end

  def destroy
    @todo.destroy
  end

  def toggle_all
    Todo.update_all(is_completed: params[:toggle])
  end

  def destroy_completed
    Todo.where(is_completed: true).delete_all
  end

  private
  def set_todo
    @todo = Todo.find params[:id]
  end

end
