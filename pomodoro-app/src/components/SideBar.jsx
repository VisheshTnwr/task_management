function Sidebar({ currentView, setCurrentView }) {
  const items = [
    { key: "all", label: "All Tasks" },
    { key: "completed", label: "Completed Tasks" },
    { key: "starred", label: "Starred Tasks" }, // Optional logic for starred
  ];

  return (
    <aside className="w-48 bg-gray-900 text-white p-4  overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Task Views</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.key}
            onClick={() => setCurrentView(item.key)}
            className={`cursor-pointer px-2 py-2 rounded hover:bg-gray-700 ${
              currentView === item.key ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
