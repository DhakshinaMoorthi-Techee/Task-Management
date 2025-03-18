import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const initialValues: any = {
  id: 0,
  title: "",
  description: "",
  dueDate: "",
  status: "inProgress",
  priority: "low",
};

export default function AddTaskComponent({ setIsModalOpen, editData }: any) {
  const { saveFormData } = useAuth();
  const [formData, setFormData]: any = useState(initialValues);

  const setFormValues = (value: any, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      saveFormData(formData);
      setFormData(initialValues);
      setIsModalOpen(false);
    }
  };

  const validate = () => {
    if (!formData.title || !formData.description || !formData.dueDate) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000b3] text-2xs p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:w-130 relative">
          <form onSubmit={handleRegister}>
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-bold">
                {editData?.id ? "Edit" : "Add"} Task
              </h2>
              <button
                className="text-gray-600 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                placeholder="Title"
                id="title"
                className="w-full p-2 border border-gray-500 rounded-md"
                required
                value={formData.title}
                onChange={(e) => setFormValues(e.target.value, "title")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Description"
                rows={4}
                className="w-full p-2 border border-gray-500 rounded-md"
                value={formData.description}
                onChange={(e) => setFormValues(e.target.value, "description")}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-gray-700">
                Choose Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                className="w-full p-2 border border-gray-500 rounded-md"
                onChange={(e) => setFormValues(e.target.value, "dueDate")}
              />
            </div>
            {editData?.id && (
              <div className="mb-6">
                <label htmlFor="status" className="block text-gray-700">
                  Status
                </label>
                <select
                  className="w-full p-2 border border-gray-500 rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormValues(e.target.value, "status")}
                >
                  <option value="completed">Completed</option>
                  <option value="inProgress">In-Progress</option>
                </select>
              </div>
            )}
            <div className="w-full flex flex-col sm:flex-row justify-around gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-1/2 border-2 px-4 py-2 rounded text-[#941B0F] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-1/2 bg-[#941B0F] text-white px-4 py-2 rounded cursor-pointer"
              >
                {editData?.id ? "Edit" : "Add"} Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
