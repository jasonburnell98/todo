import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './enhanced-shortcut-modal.css';


interface ShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function ShortcutModal({ isOpen, onClose, onAdd }: ShortcutModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isOpen) setTitle('');
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Quick Add Todo</h2>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && title.trim()) {
              onAdd(title.trim());
              onClose();
            }
          }}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              if (title.trim()) {
                onAdd(title.trim());
                onClose();
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
