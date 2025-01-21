import React, { useState } from "react";

const Popup = ({ onClose }: { onClose: () => void }) => {
  const [taskCategory, setTaskCategory] = useState("work");
  const [taskStatus, setTaskStatus] = useState("To-do");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-fit rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Task Title */}
        <input
          type="text"
          placeholder="Task Title"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-purple-400"
        />

        {/* Description */}
        <div className="border border-gray-300 rounded p-4 mb-4">
          {/* Toolbar */}
          <div className="flex space-x-2 mb-2">
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
              B
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
              I
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
              Highlight
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
              123
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
              •
            </button>
          </div>
          {/* Text Area */}
          <textarea
            className="w-full h-24 border-none focus:outline-none"
            maxLength={300}
            placeholder="Add a detailed description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Formatting options above</span>
            <span>{description.length}/300</span>
          </div>
        </div>

        {/* Task Features */}
        <div className="flex space-x-4 mb-4">
          {/* Task Category */}
          <div className="flex-1">
            <span className="block font-medium mb-1">Task Category:</span>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 border rounded ${
                  taskCategory === "work"
                    ? "bg-purple-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                onClick={() => setTaskCategory("work")}
              >
                Work
              </button>
              <button
                className={`px-4 py-2 border rounded ${
                  taskCategory === "personal"
                    ? "bg-purple-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                onClick={() => setTaskCategory("personal")}
              >
                Personal
              </button>
            </div>
          </div>

          {/* Due On */}
          <div className="flex-1">
            <span className="block font-medium mb-1">Due On:</span>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Task Status */}
          <div className="flex-1">
            <span className="block font-medium mb-1">Task Status:</span>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
            >
              <option value="To-do">To-do</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label className="block border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer">
            Drop your file here or Upload
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;