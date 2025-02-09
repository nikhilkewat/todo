import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
//import { PlusCircle } from 'lucide-react';

type AddTodoProps = {
  onAdd: (todo: string) => Promise<void>;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && !isSubmitting) {
      setIsSubmitting(true);
      await onAdd(newTodo.trim());
      setNewTodo('');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          className="form-control shadow-none"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          
          <FontAwesomeIcon size={'1x'} icon={faPlusCircle} />
          Add
        </button>
      </div>
    </form>
  );
}