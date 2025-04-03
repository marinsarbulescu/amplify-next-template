"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "@/app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Navbar from '@/components/Navbar';
import { useAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  function listTodos() {
    client.models.Todo.observeQuery({}).subscribe({
      next: (data: { items: Schema["Todo"]["type"][] }) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function handleSignOut() {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
    }
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>My ToDos</h1>
        <button onClick={createTodo} className="add-todo-btn">+ New Todo</button>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">{todo.content}</li>
          ))}
        </ul>
      </main>
    </>
  );
}