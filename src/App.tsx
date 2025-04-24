import { useState, useEffect, useCallback } from 'react';
import './App.css';

import { Todo, Priority } from './types/todo';
import { initialTodos } from './data/initialTodos';
import ShortcutSettings from './components/Shortcut/ShortcutSettings';
import ShortcutModal from './components/Shortcut/ShortcutModal';
import TodoStats from './components/Todo/TodoStats';
import TodoForm from './components/Todo/TodoForm';
import TodoList from './components/Todo/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    () => JSON.parse(localStorage.getItem('todos') || 'null') || initialTodos
  );

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'priority'>('createdAt');
  const [isDark, setIsDark] = useState(true); // Bonus: Dark Mode


  const [shortcutConfig, setShortcutConfig] = useState(() => {
    const saved = localStorage.getItem('shortcutConfig');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      priority: 'Medium' as Priority,
      dueInDays: 2
    };
  });

  const [modalOpen, setModalOpen] = useState(false);

  // Bonus: store saved todos in localStorage to avoid losing them on refresh
  useEffect(() => {
    localStorage.setItem('shortcutConfig', JSON.stringify(shortcutConfig));
  }, [shortcutConfig]);

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    setTodos(prev => [
      ...prev,
      {
        ...todo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ]);
  }, []);


  // Bonus edit mode
  const updateTodo = (id: number, newTitle: string, newPriority: Priority, newDueDate?: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, title: newTitle, priority: newPriority, dueDate: newDueDate }
        : todo
    ));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = (): Todo[] => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const values: Record<Priority, number> = { Low: 1, Medium: 2, High: 3 };
          return values[b.priority] - values[a.priority];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // bonus for the keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        const config = JSON.parse(localStorage.getItem('shortcutConfig') || '{}');
        if (!config.enabled) return;
        setModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  

  return (
    <div className={`App ${isDark ? 'dark' : ''}`}>
      <h1>Todo App</h1>
      <button className="toggle-mode-btn" onClick={() => setIsDark((d) => !d)}>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Bonus to customize keyboard shortcut */}
      <ShortcutSettings config={shortcutConfig} onChange={setShortcutConfig} />

      <ShortcutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(title: string) => {
          const config = JSON.parse(localStorage.getItem('shortcutConfig') || '{}');
          const due = new Date();
          due.setDate(due.getDate() + (config.dueInDays ?? 0));
          const dueDate = due.toISOString().split("T")[0];

          addTodo({
            title,
            priority: config.priority || 'Medium',
            dueDate
          });
        }}
      />

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <div className="todo-stats-bar">
      <TodoStats todos={todos} />
    </div>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      <p className="todo-edit-hint">
  ✏️ <em>Double click a todo to edit and click once to complete</em>
</p>

    </div>
  );
}

export default App;
