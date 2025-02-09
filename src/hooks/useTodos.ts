import { useState, useEffect } from 'react';
import { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos?limit=5');
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        setTodos(data.todos);
        console.log(data.todos);
        localStorage.setItem('todos', JSON.stringify(data.todos));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      } finally {
        setIsLoading(false);
      }
    };

    if (todos.length === 0) {
      fetchTodos();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setError(null);
  }, [todos]);

  const addTodo = async (todo: string) => {

    try {
      fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo,
          completed: false,
          userId: 1,
        }),
      }).then(response => {
        if (!response.ok) throw new Error('Failed to add todo');
        return response.json();
      }).then(data => setTodos(prev => [data, ...prev]))
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to add todo'))

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const deleteTodo = async (data: Todo) => {
    const { id, todo } = data;
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');
      await response.json();

      setTodos(prev => prev.filter(td => td.id !== id));
    } catch (err) {

      setTodos(prev => prev.filter(td => td.todo !== todo));
      setError(err instanceof Error ? err.message : 'Failed to delete todo from server');
    }
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    isLoading,
    error
  };
}