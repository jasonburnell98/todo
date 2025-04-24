import { Priority, Todo } from '../../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string, newPriority: Priority, newDueDate?: string) => void;
}

export default function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }: TodoListProps) {
  if (todos.length === 0) return <p>No todos match your filters.</p>;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}
