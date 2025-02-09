import React from 'react';
import { TodoFilter } from '../types';

type FilterProps = {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export function Filter({ currentFilter, onFilterChange }: FilterProps) {
  return (
    <div className=" input-group mb-4">
      <input
        type="text"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="search"
        className="form-control shadow-none"

      />
      <button
        onClick={() => onFilterChange('all')}
        className={`btn ${currentFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`btn ${currentFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        Completed
      </button>
      <button
        onClick={() => onFilterChange('pending')}
        className={`btn ${currentFilter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        Pending
      </button>
    </div>
  );
}