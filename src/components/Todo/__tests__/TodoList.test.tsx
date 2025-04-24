import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import TodoList from '../TodoList';
import { Priority } from '../../../types/todo';

describe('TodoList', () => {
  it('renders list items', () => {
    const todos = [
        {
          id: 1,
          title: 'Test',
          completed: false,
          priority: 'High' as Priority,
          createdAt: new Date().toISOString()
        }
      ];
      
    render(
      <TodoList
        todos={todos}
        toggleTodo={vi.fn()}
        deleteTodo={vi.fn()}
        updateTodo={vi.fn()}
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
