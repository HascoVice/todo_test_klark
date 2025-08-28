import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


// faut que j'ajoute un local storage pour les listes que j'ajoute manuellement


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data.slice(0, 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const addTodo = (todoData) => {
    setTodos([...todos, todoData]);
    console.log("Ajout de la tâche:", todoData);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo,completed:!todo.completed} : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (id, updatedData) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
    );
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App - Test Technique</h1>
        <p>Trouvez et corrigez les bugs !</p>
      </header>

      <main className="App-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
          loading={loading}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;
