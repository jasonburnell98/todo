import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShortcutSettings from '../ShortcutSettings';

describe('ShortcutSettings', () => {
  it('toggles shortcut setting', () => {
    const onChange = vi.fn();
    render(
      <ShortcutSettings
        config={{ enabled: true, priority: 'Medium', dueInDays: 3 }}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByLabelText(/Enable Shortcut/i));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ enabled: false }));
  });
});
