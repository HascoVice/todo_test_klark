import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
  loading,
}) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  const getFilteredTodos = () => {
    let filtered = todos;

    if (filter === "completed") {
      filtered = todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      filtered = todos.filter((todo) => !todo.completed);
    }

    if (sortBy === "priority") {
      filtered.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortBy === "dueDate") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  };


  const handleDelete = (id) => {
    onDeleteTodo(id);
  };

  const handleUpdate = (id, updatedData) => {
    onUpdateTodo(id, updatedData);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Chargement des tâches...</div>
      </div>
    );
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="card">
      <div className="todo-list-header">
        <h2>Liste des Tâches ({filteredTodos.length})</h2>

        <div className="todo-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes</option>
            <option value="pending">En cours</option>
            <option value="completed">Terminées</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="created">Date de création</option>
            <option value="priority">Priorité</option>
            <option value="dueDate">Date d'échéance</option>
          </select>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>Aucune tâche trouvée</p>
        </div>
      ) : (
        <div className="todo-items">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
