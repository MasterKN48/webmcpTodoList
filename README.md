# WebMCP Explorer: Todo & Insurance Dashboard

A modern React application demonstrating dual implementations of the **Web Model Context Protocol (WebMCP)**: Imperative and Declarative. This project serves as a technical showcase for the "Agentic Web," allowing AI agents to natively discover and interact with browser-based applications.

## 🚀 Overview

The **WebMCP Explorer** provides two distinct architectural examples:

- **Task Dashboard (Imperative)**: Real-time tool registration using `window.navigator.modelContext`.
- **Insurance Engine (Declarative)**: Zero-JS tool discovery using standard HTML form annotations.

## ✨ Key Features

- **Dual Approach Integration**: Compare imperative JS registration with declarative HTML attributes.
- **Granular Tool Metadata**: Uses `toolparamtitle` and `toolparamdescription` for high-precision AI interaction.
- **Visual AI Interaction**: The `get_todos` tool returns `rawHtml`, allowing AI models to visually render the Todo List UI.
- **Premium UI**: Crafted with React 19, Tailwind CSS v4, and Lucide Icons.
- **Zero Dependencies**: Pure native API integration (no external WebMCP libraries required).

## 🛠 WebMCP Availability & Setup

> [!IMPORTANT]
> WebMCP is currently available for testing behind an experimental flag in **Chrome 146** or higher.

### Prerequisites

- **Browser**: Chrome Version 146.0.7672.0 or higher.
- **Flag**: The "WebMCP for testing" flag must be enabled.

### Setup Steps

1. Navigate to: `chrome://flags/#enable-webmcp-testing`
2. Set the flag to **Enabled**.
3. **Relaunch** Chrome.

### Model Context Tool Inspector

To verify implementation, install the [Model Context Tool Inspector Extension](https://chromewebstore.google.com/detail/model-context-tool-inspec/mkblgnmcbofijhcealofolpkmhncidof). It allows you to inspect registered functions and execute them manually.

## 💻 Getting Started

### Installation

This project uses **Bun** for maximum performance.

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun run dev
   ```

3. Open your browser to `http://localhost:5174/`.

## 📚 Technical Reference

- **Imperative Registry**: Located in `src/components/TodoList.jsx`. Uses `window.navigator.modelContext.provideContext`.
- **Declarative Form**: Located in `src/components/InsuranceForm.jsx`. Uses `toolname`, `tooldescription`, and `toolparam*` attributes.
- **Navigation Logic**: Managed in `App.jsx` to toggle between implementation examples.
- **WEBMCP GUIDE**: [Google WEBMCP GUIDE](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk/edit?pli=1&tab=t.0)
