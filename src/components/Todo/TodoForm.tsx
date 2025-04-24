import { useState } from 'react';
import { Priority } from '../../types/todo';

interface TodoFormProps {
  addTodo: (todo: { title: string; priority: Priority; dueDate?: string }) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    const today = new Date().toISOString().split("T")[0];
    if (dueDate && dueDate < today) {
    alert("Due date cannot be in the past.");
    return;
    }
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title: title.trim(), priority, dueDate: dueDate || undefined });
    setTitle('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="due-date-wrapper">
        <label htmlFor="dueDate">Due Date:</label>
        <input
            id="dueDate"
            type="date"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
        />
        </div>
      <button type="submit">Add</button>
    </form>
  );
}
