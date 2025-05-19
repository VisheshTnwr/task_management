import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function TaskItem({ task, onDelete, onToggle, onStarToggle }) {
  return (
    <li className="relative mb-2 p-3 border border-gray-700 rounded flex justify-between items-center bg-black">
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
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 accent-gray-500"
        />
        
        {/* Star toggle button */}
        <button
          onClick={() => onStarToggle(task.id)}
          className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
          aria-label="Toggle Star"
        >
          <FontAwesomeIcon icon={task.starred ? solidStar : regularStar} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 ml-2 cursor-pointer"
          />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
