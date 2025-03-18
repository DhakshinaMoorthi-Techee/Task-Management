"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaPlus, FaRegEdit, FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../globals.css";
import AddTaskComponent from "@/components/addtask";
import { useAuth } from "../context/AuthContext";
import { BiSort } from "react-icons/bi";
import {
  IoChevronDown,
  IoChevronUp,
  IoFilterSharp,
  IoLogOutOutline,
} from "react-icons/io5";
import DeleteComponent from "@/components/delete";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { formDatas, onPriorityChange, setLoading } = useAuth();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(-1);
  const [sortOrder, setSortOrder] = useState(false);
  const [editData, setEditData] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [tableData, setTableData]: any = useState(formDatas);

  const onEdit = (item: any) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  const onDelete = (item: any) => {
    setEditData(item);
    setOpenDelete(true);
  };

  const sortData = () => {
    setSortOrder(!sortOrder);
    const sortedTasks = [...tableData].sort((a, b) => {
      const dateA:any = new Date(a.dueDate.split("-").join("-"));
      const dateB:any = new Date(b.dueDate.split("-").join("-"));
      return !sortOrder ? dateA - dateB : dateB - dateA;
    });
    setTableData([...sortedTasks]);
  };

  const convertDateFormat = (date:any) => {
    return date.split("-").reverse().join("-");
  };

  const toggleAccordion = (index:any) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const clearFilter = () => {
    setLoading(true);
    setStatus("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setPriority("");
    setTableData(formDatas);
    setShowFilter(!showFilter);
  };

  const onFilterTasks = () => {
    setLoading(true);
    const tempData = formDatas?.filter((s:any) => {
      return (
        (!status || s.status == status) && (!priority || s.priority == priority)
      );
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setTableData(tempData);
    setShowFilter(false);
  };

  const onSearchChange = (value:any) => {
    let temp:any = formDatas?.filter((item:any) => {
      return item?.title?.toLowerCase()?.includes(value?.toLowerCase());
    });
    setTableData([...temp]);
  };

  const setEditHide = (value: any) => {
    setEditData(null);
    setIsModalOpen(false);
  };

  const onLogout = () => {
    localStorage.setItem("user", JSON.stringify(null));
    localStorage.setItem("formData", JSON.stringify([]));
    router.push("/auth/login");
  };

  useEffect(() => {
    setTableData(formDatas);
  }, [formDatas]);

  return (
    <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col justify-between items-center mb-4">
        <div
          className="mb-2 md:mb-0 flex items-center gap-2 w-full justify-end text-lg text-[#941B0F] cursor-pointer hover:underline"
          onClick={() => onLogout()}
        >
          <p>Logout</p> <IoLogOutOutline />
        </div>
        <div className="mb-5 flex flex-col md:flex-row items-center gap-2 w-full md:justify-between">
          <Image
            className="dark:invert rounded-md"
            src="/studio-logo.jfif"
            alt="Next.js logo"
            width={100}
            height={38}
            priority
          />
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="border-2 border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none w-full"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full justify-between items-center">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <button
              className="border bg-[#941B0F] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#7A150C] transition"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus /> Add Task
            </button>
            <button
              className="border border-[#941B0F] text-[#941B0F] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#941B0F] hover:text-white transition"
              onClick={() => sortData()}
            >
              <BiSort /> Sort{" "}
              <span className="text-xs">
                {sortOrder == null ? "" : sortOrder ? "Asc" : "Desc"}
              </span>
            </button>
            <button
              className="border border-[#941B0F] text-[#941B0F] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#941B0F] hover:text-white transition"
              onClick={() => setShowFilter(!showFilter)}
            >
              <IoFilterSharp /> Filter
            </button>
          </div>
        </div>
        {showFilter && (
          <div className="absolute top-52 mt-2 right-16 bg-white p-4 rounded-lg shadow-xl border border-grey-300 z-10 w-72">
            <h3 className="text-lg font-semibold mb-2">Filter Tasks</h3>
            <select
              className="border p-2 rounded w-full mb-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Status
              </option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
            </select>
            <select
              className="border p-2 rounded w-full mb-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="w-full flex justify-around gap-2">
              <button
                onClick={() => clearFilter()}
                className="w-half border-2 px-8 py-1 rounded text-[#941B0F] cursor-pointer"
              >
                Clear
              </button>
              <button
                type="submit"
                className="w-half bg-[#941B0F] text-white px-8 py-1 rounded cursor-pointer"
                onClick={() => onFilterTasks()}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative border border-[#941B0F] hidden md:block flex flex-col w-full h-full text-gray-700 bg-white shadow-md bg-clip-border rounded-xl overflow-x-auto">
        <table className="w-full rounded-t-lg border-collapse">
          <thead className="border-b border-[#941B0F]">
            <tr className="bg-[#FFF9F8] text-[#941B0F] text-sm">
              <th className="px-4 py-4 text-left">SL.No</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Description</th>
              <th className="px-4 py-4 text-left">Due Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Priority</th>
              <th className="px-4 py-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {tableData?.length ? (
              tableData.map((task:any, index:number) => (
                <tr
                  key={task.id}
                  className={index % 2 != 0 ? "bg-[#FFF9F8]" : ""}
                >
                  <td className="px-4 py-4 text-left">{index + 1}</td>
                  <td className="px-4 py-4 text-left w-20">{task?.title}</td>
                  <td className="px-4 py-4 text-left w-130">
                    {task?.description}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap min-w-[100px]">
                    {convertDateFormat(task?.dueDate)}
                  </td>
                  <td className="px-4 py-4 text-left">
                    <span
                      className={`px-2 py-1 text-white rounded-xl ${
                        task?.status == "completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task?.status == "completed" ? "Completed" : "Inprogress"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-left">
                    <div className="border border-black rounded-lg block w-26">
                      <select
                        className="rounded px-2 py-1 focus:outline-none"
                        value={task?.priority}
                        onChange={(e) =>
                          onPriorityChange(e.target.value, task?.id)
                        }
                      >
                        <option className="low" value="low">
                          Low
                        </option>
                        <option className="medium" value="medium">
                          Medium
                        </option>
                        <option className="high" value="high">
                          High
                        </option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-left flex">
                    <button
                      className="ml-3 mr-3 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => onEdit(task)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => onDelete(task)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center px-4 py-4" colSpan={7}>
                  No Task Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-lg mx-auto block md:hidden">
        {tableData?.length ? (
          tableData.map((task:any, index:number) => (
            <div key={task.id} className="border border-[#941B0F] mb-2">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-white"
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <p className="mb-1 text-sm font-bold text-[#941B0F]">SL.No</p>
                  <p>{index + 1}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-[#941B0F]">Title</p>
                  <p>{task.title}</p>
                </div>
                <button className="text-[#941B0F] text-lg">
                  {openAccordion === index ? (
                    <IoChevronUp />
                  ) : (
                    <IoChevronDown />
                  )}
                </button>
              </div>
              {openAccordion === index && (
                <div className="bg-[#FFF9F8] p-4">
                  <p className="mb-1 text-sm font-bold text-[#941B0F]">
                    Description
                  </p>
                  <p className="mb-2">{task.description}</p>

                  <p className="mb-1 text-sm font-bold text-[#941B0F]">
                    Due Date
                  </p>
                  <p className="mb-2">{convertDateFormat(task?.dueDate)}</p>

                  <p className="mb-1 text-sm font-bold text-[#941B0F]">
                    Status
                  </p>
                  <span
                    className={`px-2 py-1 text-white rounded-xl ${
                      task?.status == "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {task?.status == "completed" ? "Completed" : "Inprogress"}
                  </span>

                  <p className="mb-1 text-sm font-bold text-[#941B0F] mt-2">
                    Priority
                  </p>
                  <div className="border border-black rounded-lg block w-26">
                    <select
                      className="rounded px-2 py-1 focus:outline-none"
                      value={task?.priority}
                      onChange={(e) =>
                        onPriorityChange(e.target.value, task?.id)
                      }
                    >
                      <option className="low" value="low">
                        Low
                      </option>
                      <option className="medium" value="medium">
                        Medium
                      </option>
                      <option className="high" value="high">
                        High
                      </option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end mt-3 space-x-3">
                    <button
                      className="ml-3 mr-3 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => onEdit(task)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => onDelete(task)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center p-4 cursor-pointer border border-[#941B0F] mb-2">
            <p className="mb-1 text-sm font-bold text-[#941B0F]">
              No Task Found
            </p>
          </div>
        )}
      </div>
      {isModelOpen && (
        <AddTaskComponent setIsModalOpen={setEditHide} editData={editData} />
      )}
      {openDelete && (
        <DeleteComponent setOpenDelete={setOpenDelete} editData={editData} />
      )}
    </div>
  );
};

export default Dashboard;
