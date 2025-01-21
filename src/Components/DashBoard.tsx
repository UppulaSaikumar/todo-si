import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import "../customerStyling/DashboardMobile.css"
import Popup from "./TaskManagePop-up";
import StickyNote from "./StickyNote";

const initialTasks = {
  todo: [
    { id: "1", content: "Task 1: Complete the project" },
    { id: "2", content: "Task 2: Call the client" },
  ],
  inProgress: [{ id: "3", content: "Task 3: Prepare for the meeting" }],
  complete: [{ id: "4", content: "Task 4: Submit the report" }],
};

const SortableItem = ({ id, content }: { id: string; content: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded mb-2 shadow cursor-pointer"
    >
      {content}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showPopup, setShowPopup] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return; // If dropped outside, do nothing

    const sourceId = active.data.current.droppableId;
    const destinationId = over.data.current.droppableId;

    if (!tasks[sourceId] || !tasks[destinationId]) {
      console.error("Invalid source or destination ID");
      return;
    }

    const sourceTasks = [...tasks[sourceId]];
    const destinationTasks = [...tasks[destinationId]];

    // Reordering or moving tasks
    if (sourceId === destinationId) {
      // Reordering within the same column
      const oldIndex = sourceTasks.findIndex((task) => task.id === active.id);
      const newIndex = destinationTasks.findIndex((task) => task.id === over.id);

      setTasks((prev) => ({
        ...prev,
        [sourceId]: arrayMove(sourceTasks, oldIndex, newIndex),
      }));
    } else {
      // Moving between columns
      const movedTask = sourceTasks.find((task) => task.id === active.id);

      if (!movedTask) return;

      sourceTasks.splice(sourceTasks.indexOf(movedTask), 1);
      destinationTasks.splice(destinationTasks.indexOf(over.id), 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [sourceId]: sourceTasks,
        [destinationId]: destinationTasks,
      }));
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "rgba(255, 255, 255, 1)" }}>
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-white rounded ">
        <h1 className="text-2xl font-Mulish text-gray-800">TodoSI</h1>
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      </header>

      {/* Filters and Buttons */}
      <div className="flex flex-wrap m-4 justify-between items-center ">
        <div className="flex flex-wrap space-x-4 w-full sm:w-auto">
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block  w-full sm:w-40 px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 block w-full sm:w-40 px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-4 mt-2 sm:mt-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-3 py-2 border border-gray-300 rounded shadow-sm w-full sm:w-60 mb-2 sm:mb-0"
          />
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 w-full sm:w-auto"
            onClick={() => setShowPopup(true)}>
            + Add Task
          </button>
          {showPopup && <Popup onClose={() => setShowPopup(false)} />}
        </div>
      </div>

      {/* Board View */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {Object.keys(tasks).map((status) => (
            <SortableContext key={status} items={tasks[status].map((task) => task.id)}>
              <div
                className="p-4 rounded shadow"
                style={{ background: "rgba(88, 87, 81, 0.07)" }}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    <span
                      style={{
                        background:
                          status === "todo"
                            ? "rgba(255, 182, 193, 0.5)" // Baby pink for 'To-Do'
                            : status === "inProgress"
                              ? "rgba(173, 216, 230, 0.5)" // Light blue for 'In-Progress'
                              : "rgba(144, 238, 144, 0.5)", // Light green for 'Completed'
                        padding: "0.2rem 0.5rem", // Add padding to make it look neat
                        borderRadius: "4px", // Optional: rounded corners
                        display: "inline-block", // Ensures the background wraps around the text
                      }}
                    >
                      {status === "todo"
                        ? "To-Do"
                        : status === "inProgress"
                          ? "In-Progress"
                          : "Completed"}
                    </span>
                  </h3>
                </div>

                {tasks[status].map((task) => (
                  <div key={task.id}>
                    <StickyNote
                      title={task.content}
                      onEdit={() => { }}
                      onDelete={() => { }}
                      style={{
                        textDecoration: status === "complete" ? "line-through" : "none", // Apply strike-through if completed
                      }}
                    />
                  </div>
                ))}

              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext >
    </div >
  );
};

export default Dashboard;