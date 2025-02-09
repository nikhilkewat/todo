import React from 'react';
import { Todo } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onDelete: (data: Todo) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item d-flex align-items-center p-2 border rounded mb-2">
      <div className="form-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="form-check-input"
          id={`todo-${todo.id}`}
        />
        <label
          className={`form-check-label flex-grow-1 ms-2 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
          htmlFor={`todo-${todo.id}`}
        >
          {todo.todo}
        </label>
      </div>
      <button
        onClick={() => onDelete(todo)}
        className="btn btn-link text-danger p-0 ms-auto delete-btn"
      >
        <FontAwesomeIcon icon={faTrash} size='1x' color='red' />
      </button>
    </div>
  );
}