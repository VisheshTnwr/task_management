import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit() {
    onAddTask(title, priority);
    setTitle("");
    setPriority("Medium");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
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
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded cursor-pointer hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
}

export default TaskForm;