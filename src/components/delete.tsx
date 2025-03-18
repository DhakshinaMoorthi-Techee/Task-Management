import { useAuth } from "@/app/context/AuthContext";
import { FaTimes } from "react-icons/fa";

export default function DeleteComponent({ setOpenDelete, editData }: any) {
  const { deleteData } = useAuth();

  const onDeleteData = () => {
    deleteData(editData);
    setOpenDelete(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000b3] text-2xs p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:w-130 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">
              Are you sure that you wish to delete this task?
            </h2>
            <button
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={() => setOpenDelete(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-around gap-2">
            <button
              onClick={() => setOpenDelete(false)}
              className="w-full sm:w-1/2 border-2 px-4 py-2 rounded text-[#941B0F] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#941B0F] text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => onDeleteData()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
