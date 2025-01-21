import React, { useState, useEffect, useRef } from "react";

const StickyNote = ({
  title,
  onEdit,
  onDelete,
  category = "Work",
  date = new Date().toLocaleDateString(),
  style = {},
}: {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  category?: string;
  date?: string;
  style?: React.CSSProperties;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [menuOpen]);

  const categoryColors: Record<string, string> = {
    Work: "bg-blue-100 text-blue-800",
    Personal: "bg-green-100 text-green-800",
    Urgent: "bg-red-100 text-red-800",
    Other: "bg-gray-100 text-gray-800",
  };

  const categoryClass = categoryColors[category] || categoryColors["Other"];

  return (
    <div
      className={`rounded-lg p-4 m-4 shadow-md relative w-70 h-40`}
      style={style}
    >
      {/* Title and Menu */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`font-bold text-gray-800 text-lg truncate`}
          style={style}
        >
          {title}
        </h3>
        <div ref={menuRef} className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Open menu"
          >
            &#x2022;&#x2022;&#x2022;
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button
                onClick={onEdit}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                aria-label="Edit task"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                aria-label="Delete task"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category and Date */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${categoryClass}`}
        >
          {category}
        </span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default StickyNote;
