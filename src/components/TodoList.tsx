import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, TodoFilter } from '../types';

type TodoListProps = {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: number) => Promise<void>;
  onDelete: (todo: Todo) => Promise<void>;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    if (!['all', 'pending', 'completed'].includes(filter)) return new RegExp(filter, "gi").test(todo.todo);
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <p className="text-center text-muted py-4">
        No {filter !== 'all' ? filter : ''} todos found
      </p>
    );
  }

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={Math.random()}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}