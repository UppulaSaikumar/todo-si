import React, { useState } from "react";

const StickyNote = ({
  title,
  onEdit,
  onDelete,
  category = "Work",
  date = new Date().toLocaleDateString(),
}: {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  category?: string;
  date?: string;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-md bottom-3 w-70 h-40 relative">
      {/* Title and Menu */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            &#x2022;&#x2022;&#x2022;
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button
                onClick={onEdit}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <span className="text-sm text-gray-700 font-medium">{category}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default StickyNote;