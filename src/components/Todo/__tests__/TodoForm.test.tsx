import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoForm from '../TodoForm';

describe('TodoForm', () => {
  it('adds a new todo on submit', () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'My Task' } });

    fireEvent.click(screen.getByText(/add/i));
    expect(addTodo).toHaveBeenCalledWith(expect.objectContaining({ title: 'My Task' }));
  });
});
