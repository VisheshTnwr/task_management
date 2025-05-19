import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onToggleTask, onToggleStar }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
          onStarToggle={onToggleStar} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
