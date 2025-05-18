import { useState, useEffect, useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Optimize Function for LocalStorage
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Optimize Function for Adding the Tasks
  function addTask(title, priority) {
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
  }

  // Optimize Function for Deleting the Tasks
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  //Optimize Function for Toggling Task Completion
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task App</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onToggleTask={toggleTask} 
      />
    </div>
  );
}

export default App;