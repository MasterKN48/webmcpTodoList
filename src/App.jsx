import { useState } from "react";
import TodoList from "./components/TodoList";
import InsuranceForm from "./components/InsuranceForm";

function App() {
  const [currentView, setCurrentView] = useState("todo"); // 'todo' or 'insurance'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-200">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 uppercase tracking-wider">
              WebMCP Explorer
            </h1>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 italic">
              learning webMCP: both approach imperative and declarative
            </p>
          </div>
          <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView("todo")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                currentView === "todo"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Todo List (Imperative)
            </button>
            <button
              onClick={() => setCurrentView("insurance")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                currentView === "insurance"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Insurance Form (Declarative)
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        {currentView === "todo" ? (
          <TodoList onNavigateToInsurance={() => setCurrentView("insurance")} />
        ) : (
          <InsuranceForm onNavigateBack={() => setCurrentView("todo")} />
        )}
      </main>

      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-800 mt-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Built with ❤️ to demonstrate Web Model Context Protocol
        </p>
      </footer>
    </div>
  );
}

export default App;
