"use client";

import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function saveTask() {
    const value = task.trim();

    if (!value) return;

    if (editingId !== null) {
      // UPDATE existing task
      setTasks(
        tasks.map((item) =>
          item.id === editingId ? { ...item, title: value } : item,
        ),
      );

      setEditingId(null);
    } else {
      // CREATE new task
      const newTask = {
        id: crypto.randomUUID(),
        title: value,
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
  }

  function editTask(item) {
    setTask(item.title);
    setEditingId(item.id);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setTask("");
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setTask("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">My Task Manager 🚀</h1>

        <p className="mt-3 text-gray-600">My first Next.js CRUD application</p>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveTask();
            }}
            className="mt-5 flex gap-3"
          >
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task..."
              className="min-w-0 flex-1 rounded border border-gray-300 p-3 text-gray-900"
            />

            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-3 text-white"
            >
              {editingId !== null ? "Update" : "Add"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded bg-gray-500 px-4 py-3 text-white"
              >
                Cancel
              </button>
            )}
          </form>

          <ul className="mt-6 space-y-3">
            {tasks.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded bg-gray-100 p-3"
              >
                <span className="text-gray-900">{item.title}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editTask(item)}
                    className="rounded bg-amber-500 px-3 py-2 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(item.id)}
                    className="rounded bg-red-600 px-3 py-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p className="mt-5 text-gray-500">
              No tasks yet. Add your first task!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
