class Todo < ApplicationRecord
  validates :content, presence: true

  def isCompleted
    is_completed
  end
end
