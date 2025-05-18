import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

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

  function priorityStyles(priority) {
    switch (priority) {
      case "Low":
        return "bg-green-200 text-green-700";
      case "Medium":
        return "bg-yellow-200 text-yellow-700";
      case "High":
        return "bg-red-200 text-red-700";
      default:
        return "";
    }
  }

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul>
  {tasks.map(task => (
    <li
      key={task.id}
      className="mb-2 p-3 border border-gray-700 rounded flex justify-between items-center"
    >
      <div>
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() =>
            setTasks(
              tasks.map(t =>
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
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
