import React, { useState } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import { TodoFilter } from './types';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSpinner } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, isLoading, error } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('all');

  console.log(todos);

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <FontAwesomeIcon icon={faList} size={'lg'} color='blue' />
                  <h1 className="h3 mb-0 ms-3">Todo List</h1>
                </div>
                {/* {error !== null && <div className='alert alert-danger'>{error}</div>} */}

                <AddTodo onAdd={addTodo} />
                <Filter currentFilter={filter} onFilterChange={setFilter} />

                {isLoading ? (
                  <div className="text-center py-4">
                    <FontAwesomeIcon icon={faSpinner} size='3x' />
                  </div>
                ) : (
                  <TodoList
                    todos={todos}
                    filter={filter}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
