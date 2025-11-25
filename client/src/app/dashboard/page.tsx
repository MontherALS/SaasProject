"use client";
import { Props, FormData, Task } from "@/types/type";
import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
export default function DashboardPage() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dueDate: "",
    priority: "low",
  });

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }
    try {
      setIsAuthenticated(true);
      const res = await fetch(`http://localhost:5000/task/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log("Failed to fetch user data, redirecting to login...");
        return;
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.log("Failed to add task");
        return;
      }
      const data = await res.json();
      setFormData({
        name: "",
        dueDate: "",
        priority: "low",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickLogout = () => {
    const verify = confirm("Are you sure you want to logout?");
    if (!verify) return;

    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }
    try {
      const taskId = value;
      const res = await fetch(`http://localhost:5000/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: checked }),
      });
      if (!res.ok) {
        console.log("Failed to update task ", res.status);
        return;
      }

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskId = e.currentTarget.value;
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/task/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log("Failed to delete task");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const props: Props = {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <p className="text-2xl animate-bounce text-red-700">
          Log in to show this page
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-yellow-400 mb-2">
                My Dashboard
              </h1>
              <p className="text-gray-400">Manage your tasks efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome back</span>
              <button
                onClick={handleClickLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition duration-200">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold text-yellow-400">{tasks.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition duration-200">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-400">
              {tasks.filter((task) => task.completed).length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition duration-200">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Pending
            </h3>
            <p className="text-3xl font-bold text-red-400">
              {" "}
              {tasks.filter((task) => !task.completed).length}
            </p>
          </div>
        </div>

        {/* Add New Task */}
        <AddTaskForm {...props} />
        {/* Tasks List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400">My Tasks</h2>
          </div>

          <div className="p-6">
            {tasks.length === 0 && (
              <p className="text-gray-400">
                No tasks available. Add a new task!
              </p>
            )}
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30 transition duration-200"
              >
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleCheckboxChange}
                    value={task._id}
                    className="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                  />
                  <div className="flex-1">
                    <span
                      className={`block ${
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-300"
                      }`}
                    >
                      {task.name}
                    </span>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-400 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Due:{" "}
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "No due date"}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-sm text-white ${
                      task.completed
                        ? "bg-green-600"
                        : task.priority === "high"
                        ? "bg-blue-600"
                        : task.priority === "medium"
                        ? "bg-yellow-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {task.completed ? "Done" : task.priority}
                  </span>
                  <button
                    onClick={handleDeleteTask}
                    value={task._id}
                    className="text-red-400 hover:text-red-300 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
