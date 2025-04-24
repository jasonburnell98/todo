import { useRef, useState } from 'react';
import { Priority } from '../../types/todo';

interface Props {
  config: {
    enabled: boolean;
    priority: Priority;
    dueInDays: number;
  };
  onChange: (newConfig: Props['config']) => void;
}

export default function ShortcutSettings({ config, onChange }: Props) {
  const [expanded, setExpanded] = useState(() => {
    return localStorage.getItem('shortcutPanelExpanded') === 'true';
  });

  const panelRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setExpanded(prev => {
      localStorage.setItem('shortcutPanelExpanded', String(!prev));
      return !prev;
    });
  };

  return (
    <div className="settings-container">
      <button className="settings-toggle" onClick={toggleExpanded}>
        {expanded ? '▾ Hide Shortcut Settings' : '▸ Show Shortcut Settings'}
      </button>

      <div
        ref={panelRef}
        className={`settings-panel ${expanded ? 'expanded' : ''}`}
        style={{
          maxHeight: expanded ? panelRef.current?.scrollHeight : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => onChange({ ...config, enabled: e.target.checked })}
          />{' '}
          Enable Shortcut (Ctrl+N / Cmd+N)
        </label>

        <label>
          Default Priority:{' '}
          <select
            value={config.priority}
            onChange={(e) => onChange({ ...config, priority: e.target.value as Priority })}
            className="setting-input"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Due in (days):{' '}
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={config.dueInDays.toString().replace(/^0+(?!$)/, '')}
            onChange={(e) => {
              const raw = e.target.value.replace(/^0+(?!$)/, '');
              const clean = raw === '' ? 0 : parseInt(raw, 10);
              onChange({ ...config, dueInDays: clean });
            }}
            className="setting-input"
          />
        </label>
      </div>
    </div>
  );
}
