import { useState, useEffect, useRef } from 'react';
import { Todo, Priority } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string, newPriority: Priority, newDueDate?: string) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [draftPriority, setDraftPriority] = useState<Priority>(todo.priority);
  const [draftDueDate, setDraftDueDate] = useState(todo.dueDate || '');

  const editRef = useRef<HTMLLIElement>(null);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    updateTodo(todo.id, draftTitle.trim(), draftPriority, draftDueDate || undefined);
    setIsEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, draftTitle, draftPriority, draftDueDate]);

  return (
    <li className="todo-item" ref={editRef}>
      {isEditing ? (
        <>
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
          <select
            value={draftPriority}
            onChange={(e) => setDraftPriority(e.target.value as Priority)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={draftDueDate}
            onChange={(e) => setDraftDueDate(e.target.value)}
          />
        </>
      ) : (
        <span
          onDoubleClick={handleEdit}
          onClick={() => toggleTodo(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer',
            flex: 1
          }}
        >
          {todo.title}
          {todo.dueDate && (
            <small style={{ marginLeft: '0.5rem', fontStyle: 'italic', fontSize: '0.75rem' }}>
              📅 {todo.dueDate}
            </small>
          )}
        </span>
      )}

      {!isEditing && (
        <span className={`badge ${todo.priority.toLowerCase()}`}>
          {todo.priority}
        </span>
      )}

      <button onClick={() => deleteTodo(todo.id)} aria-label="Delete">🗑️</button>
    </li>
  );
}
