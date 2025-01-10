import { useState, useEffect } from "react";

const Event = ({ showEventPopUp, onClose, selectedDate, onSave }) => {
  const [tasks, setTasks] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("calendarTasks")) || {};
    setTasks(savedTasks);
  }, []);


  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newTask = {
      title: tasks.title,
      startTime: tasks.startTime,
      endTime: tasks.endTime,
      description: tasks.description,
      id: Date.now(),
    };
  
    if (newTask.title && newTask.startTime && newTask.endTime) {
        console.log("selected date", selectedDate);
        
        onSave({ ...newTask, id: Date.now() }, selectedDate); // Add a unique ID to the task
        setTasks({ title: "", startTime: "", endTime: "", description: "" });
        onClose(); // Close popup after saving
        console.log("selected date 2", selectedDate);

      }
  };

  

  if (!showEventPopUp) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={tasks.title}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={tasks.startTime}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={tasks.endTime}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={tasks.description}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Event;
