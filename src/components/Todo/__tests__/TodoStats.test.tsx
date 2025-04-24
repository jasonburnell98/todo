import { render, screen } from '@testing-library/react';
import TodoStats from '../TodoStats';
import { describe, it, expect } from 'vitest';
import { Priority } from '../../../types/todo';

describe('TodoStats', () => {
  it('shows correct stats', () => {
    const todos = [
      {
        id: 1,
        title: 'Test',
        completed: false,
        priority: 'High' as Priority,
        createdAt: new Date().toISOString()
      }
    ];
    
    render(<TodoStats todos={todos} />);
    expect(
      screen.getByText((_content, element) =>
        element?.textContent === 'Total: 1'
      )
    ).toBeInTheDocument();
    
    expect(
      screen.getByText((_content, element) =>
        element?.textContent === 'Active: 1'
      )
    ).toBeInTheDocument();
    
    expect(
      screen.getByText((_content, element) =>
        element?.textContent === 'Total: 1' || false
      )
    ).toBeInTheDocument();
    

  });
});
