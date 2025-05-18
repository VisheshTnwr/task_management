import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

// optimize Funciton for LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return; 
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

// Optimize Function for Adding the Tasks
  function addTask() {
    if (!title.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        priority,
        done: false,
      },
    ]);
    setTitle("");
    setPriority("Medium");
  }

// Optimize Function for Handling the "Enter" Key
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

// Optimize Function for Deleting the Tasks 
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 mr-2 rounded w-2/3"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-600 bg-gray-900 text-white p-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="bg-gray-900 text-white">Low</option>
          <option className="bg-gray-900 text-white">Medium</option>
          <option className="bg-gray-900 text-white">High</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 mt-3 rounded cursor-pointer hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

{/* Optimize Task Element */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="relative mb-2 p-3 border border-gray-700 rounded flex justify-between items-center bg-black"
          >
            {task.done && (
              <span className="absolute inset-0 bg-green-400 opacity-20 rounded pointer-events-none"></span>
            )}

            <div className="relative z-10">
              <span
                className={`block ${
                  task.done ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.title}
              </span>
              <span
                className={`
        text-xs mt-1 inline-block px-2 py-0.5 rounded 
        ${
          task.priority === "High"
            ? "bg-red-600 text-white"
            : task.priority === "Medium"
            ? "bg-yellow-500 text-black"
            : "bg-green-600 text-white"
        }
      `}
              >
                {task.priority}
              </span>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
                className="w-4 h-4 accent-gray-500"
              />
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 ml-2 cursor-pointer"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
