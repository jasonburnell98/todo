# React Todo App

A fully-featured Todo app built with React, TypeScript, and Vitest.  
Includes:

- Add/edit/delete todos
- Filtering by status & priority
- Sorting by date and priority
- Quick-add via keyboard shortcut (configurable)
- Dark mode toggle
- Stats display for total/active/completed + top priority
- Animated shortcut settings panel
- Full test coverage with Testing Library + Vitest

---

## 🛠 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jasonburnell98/todo
cd react-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`.

---

## 🧪 Running Tests

### Run all tests:

```bash
npm run test
```

### Run tests with coverage:

```bash
npm run test:coverage
```

- Coverage reports will be saved to `coverage/`
- You can open `coverage/index.html` in a browser to view visual coverage

---

## 🎯 Keyboard Shortcuts

- **Ctrl+N** / **Cmd+N** → Quick-add todo
- The default title, priority, and due date for quick-adds can be configured in the **Shortcut Settings** panel.

---

## 🌙 Dark Mode

Click the **"Dark Mode"** toggle at the top of the app to enable dark mode.

- Persists across reloads
- Applies to full background and all cards/forms
- Uses Tailwind-style color palette with accessible contrast

---

## 🧱 Folder Structure

```
src/
  components/
    Todo/
      TodoForm.tsx
      TodoList.tsx
      TodoItem.tsx
      TodoStats.tsx
      __tests__/
    Shortcuts/
      ShortcutSettings.tsx
      ShortcutModal.tsx
      __tests__/
  data/
    initialTodos.ts
  types/
    todo.ts
vitest.setup.ts
vitest.config.ts
```

---

## ✅ Tech Stack

- React + Vite
- TypeScript
- Tailwind-style CSS (manual classes)
- Vitest + Testing Library
- LocalStorage for persistence
