# 🚧 Kanban Board UI - React Learning Project

> **Project Status: Draft / Educational** > This project is a personal project created to practice **React**, **TypeScript**, and **Atomic Design** principles. It serves as a functional UI prototype to explore state management and component architecture.

---

## 📋 Learning Objectives
The primary goal of this repository is to demonstrate and master:
* **Atomic Design:** Organizing components into Atoms, Molecules, and Organisms.
* **Complex State:** Managing nested objects (Boards > Columns > Tasks).
* **Type Safety:** Using TypeScript interfaces for predictable data flow.
* **Utility-First CSS:** Building a responsive, modern UI with Tailwind CSS.

---

## ✨ Features Implemented

### 1. Board & Column Management
* **Multi-Board Support:** Switch between different project contexts.
* **Column CRUD:** Create, edit, and delete status columns (e.g., "Backlog", "In Review").
* **Logic Constraints:** Minimum 3-column restriction and task count tracking.

### 2. Task Operations
* **Task Creation:** Add tasks with titles, descriptions, and priority levels.
* **Priority Badging:** Visual color-coding for Low, Medium, and High priority.
* **Action Handling:** Delete tasks and clear board statistics.

### 3. UI/UX Foundations
* **Responsive Layout:** Fully fluid grid/flexbox design.
* **Interactive States:** Hover effects, transitions, and confirmation dialogs.
* **Mock API:** Pre-loaded with sample data for immediate testing.

---

## 🏗️ Atomic Architecture

The project structure follows the **Atomic Design** methodology:

* **Atoms:** Base components (`Button`, `Input`, `Icon`, `Badge`).
* **Molecules:** Combined atoms (`TaskCard`, `AddTaskForm`, `BoardSelector`).
* **Organisms:** Complex sections (`BoardContent`, `ColumnManager`).
* **Types:** Centralized TypeScript interfaces for `Board`, `Column`, and `Task`.

---

## 🛠️ Tech Stack
* **Framework:** React (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Custom SVG Implementation

---
