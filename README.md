# WebMCP Todo List Learning Project

This is a learning project designed to demonstrate the implementation of **WebMCP** in a modern React application. It showcases how to expose application state and functionality as AI-consumable tools directly from the web browser.

## 🚀 Overview

The project is a sleek, responsive Todo List application built with React and Vite. While it functions as a standard task manager, its primary purpose is to illustrate the integration of the `@mcp-b/react-webmcp` library.

## ✨ Key Features

- **Modern UI**: Built with a clean, Material-inspired design using Tailwind CSS.
- **Persistence**: Automatically saves your tasks to `localStorage`.
- **Theme Support**: Responsive dark/light mode support.
- **WebMCP Integration**: Exposes core functionality through the Model Context Protocol (MCP).

## 🛠 WebMCP Integration

This application exposes several MCP tools that allow an AI agent to interact with your todo list:

- `get_todos`: Retrieves all current tasks and provides a pre-rendered HTML UI representation.
- `add_todo`: Allows the agent to add a new task to your list.
- `toggle_todo`: Switches the completion status of a specific task.
- `delete_todo`: Removes a task from the list.

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Bun](https://bun.sh/) (Optional, but recommended for faster dependency management)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

## 📚 Learning More

To understand how the MCP tools are implemented, check out the logic in:

- `src/components/TodoList.jsx`: Contains the `useWebMCP` hook definitions.
- `package.json`: Shows the `@mcp-b/` dependencies used.
