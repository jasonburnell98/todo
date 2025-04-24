import { Todo, Priority } from '../../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;

  const priorityOrder: Record<Priority, number> = { Low: 1, Medium: 2, High: 3 };
  const highestPriority = todos
    .filter(t => !t.completed)
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])[0];

  return (
    <div className="todo-stats-bar">
      <p><strong>Total:</strong> {total}</p>
      <p><strong>Active:</strong> {active}</p>
      <p><strong>Completed:</strong> {completed}</p>
      {highestPriority && (
        <p>
          <strong>Top Priority:</strong> {highestPriority.title} ({highestPriority.priority})
        </p>
      )}
    </div>
  );
}
