import { Props } from "@/types/type";

export default function AddTaskForm({
  handleChange,
  formData,
  setFormData,
  handleSubmit,
}: Props) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Add New Task</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter task title or description"
          className="md:col-span-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
        <input
          type="date"
          onChange={handleChange}
          value={formData.dueDate}
          name="dueDate"
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
        <div className="flex justify-between items-center mt-4 md:col-span-3">
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as "low" | "medium" | "high",
              })
            }
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition duration-200">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
