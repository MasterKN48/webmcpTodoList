import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, Circle, Edit2, X } from "lucide-react";

export default function TodoList({ onNavigateToInsurance }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue.trim(), completed: false },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = (id) => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo,
      ),
    );
    setEditingId(null);
  };

  const activeTodosCount = todos.filter((t) => !t.completed).length;

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator.modelContext) {
      const toolConfigs = [
        {
          name: "get_todos",
          description:
            "Retrieve all current todo tasks and their UI representation",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            const todosHtml =
              todos.length === 0
                ? `<div style="text-align:center; padding: 2rem; color:#6b7280;">You have no tasks! Enjoy your day.</div>`
                : `<ul style="list-style-type:none; padding:0; display:flex; flex-direction:column; gap:0.75rem;">` +
                  todos
                    .map(
                      (todo) => `
                  <li style="display:flex; align-items:center; justify-content:space-between; padding:1rem; border-radius:0.75rem; border:1px solid #f3f4f6; background-color:#ffffff; box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.05); ${todo.completed ? "opacity:0.7; background-color:#f9fafb;" : ""}">
                    <div style="display:flex; align-items:center; gap:1rem;">
                      <div style="width:1.75rem; height:1.75rem; border-radius:9999px; ${todo.completed ? "background-color:#e0e7ff; color:#6366f1;" : "border:2px solid #d1d5db;"} display:flex; align-items:center; justify-content:center;">
                        ${todo.completed ? "✓" : ""}
                      </div>
                      <span style="font-size:1.125rem; ${todo.completed ? "color:#9ca3af; text-decoration:line-through;" : "color:#374151; font-weight:500;"}">
                        ${todo.text}
                      </span>
                    </div>
                  </li>
                `,
                    )
                    .join("") +
                  `</ul>`;

            return {
              todos,
              ui: {
                rawHtml: todosHtml,
              },
            };
          },
        },
        {
          name: "add_todo",
          description: "Add a new todo task to the list",
          inputSchema: {
            type: "object",
            properties: {
              text: { type: "string" },
            },
            required: ["text"],
          },
          execute: async ({ text }) => {
            const newTodo = {
              id: Date.now(),
              text: text.trim(),
              completed: false,
            };
            setTodos((prev) => [...prev, newTodo]);
            return { success: true, todo: newTodo };
          },
        },
        {
          name: "toggle_todo",
          description: "Toggle the completion status of a todo task by its ID",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          execute: async ({ id }) => {
            let newStatus = false;
            setTodos((prev) =>
              prev.map((todo) => {
                if (todo.id === id) {
                  newStatus = !todo.completed;
                  return { ...todo, completed: newStatus };
                }
                return todo;
              }),
            );
            return { success: true, newStatus };
          },
        },
        {
          name: "delete_todo",
          description: "Delete a todo task by its ID",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          execute: async ({ id }) => {
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            return { success: true };
          },
        },
      ];

      window.navigator.modelContext.provideContext({
        tools: toolConfigs,
      });
      return () => {
        window.navigator.modelContext.clearContext();
      };
    }
  }, [todos]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Tasks
            </h1>
            <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
              {activeTodosCount} active
            </span>
          </div>

          <form onSubmit={addTodo} className="relative mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full pl-5 pr-12 py-4 bg-gray-100 dark:bg-gray-700/50 border-transparent dark:border-gray-700 focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 transition-all duration-200 text-lg shadow-inner outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed group"
            >
              <Plus
                size={24}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </form>

          {todos.length === 0 ? (
            <div className="text-center py-10 flex flex-col items-center justify-center opacity-60">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <CheckCircle
                  size={48}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg text-balance">
                You have no tasks! Enjoy your day.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out ${
                    todo.completed
                      ? "opacity-70 bg-gray-50 dark:bg-gray-800/60"
                      : ""
                  }`}
                >
                  {editingId === todo.id ? (
                    <div className="flex flex-1 items-center gap-2 mr-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded drop-shadow-sm px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(todo.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="text-green-500 hover:text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg transition-colors"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 flex-1 overflow-hidden pr-4">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`flex-shrink-0 transition-colors duration-200 focus:outline-none rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                            todo.completed
                              ? "text-indigo-500"
                              : "text-gray-300 dark:text-gray-600 hover:text-indigo-400"
                          }`}
                        >
                          {todo.completed ? (
                            <CheckCircle
                              size={28}
                              className="fill-indigo-100 dark:fill-indigo-900/30"
                            />
                          ) : (
                            <Circle size={28} />
                          )}
                        </button>
                        <span
                          className={`text-lg truncate transition-all duration-300 ${
                            todo.completed
                              ? "text-gray-400 dark:text-gray-500 line-through"
                              : "text-gray-700 dark:text-gray-200 font-medium"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => startEditing(todo)}
                          className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors focus:outline-none"
                          aria-label="Edit todo"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors focus:outline-none"
                          aria-label="Delete todo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <span>{todos.length} total items</span>
              <button
                onClick={onNavigateToInsurance}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Buy Insurance ➔
              </button>
            </div>
            {todos.some((t) => t.completed) && (
              <button
                onClick={() => setTodos(todos.filter((t) => !t.completed))}
                className="hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
