import { useState, useEffect, useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Sidebar from "./components/SideBar";

function App() {
  const [currentView, setCurrentView] = useState("all");

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
        starred: false,
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
  // optimize Code to add the tasks in thier designated space in the sidebar

  function toggleStar(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, starred: !task.starred } : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (currentView === "completed") return task.done;
    if (currentView === "starred") return task.starred; // Future use
    return true;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Task App</h1>
          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onToggleStar={toggleStar}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
