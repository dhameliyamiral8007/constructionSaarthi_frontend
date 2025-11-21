import React, { useState } from "react";
import { EllipsisVertical, Eye, Lock, Ban, X, EyeOff } from "lucide-react";

const Users = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [exportOpen, setExportOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const users = [
    {
      id: 1,
      name: "Aashutosh Sharma",
      email: "aashutoshsharma01@gmail.com",
      role: "Admin",
      status: "active",
      phone: "347-452-3594",
      joined: "21 Oct, 2024",
    },
    {
      id: 2,
      name: "Jatin Shah",
      email: "jatinshah98@gmail.com",
      role: "Supervisor",
      status: "inactive",
      phone: "551-694-5325",
      joined: "15 Oct, 2024",
    },
    {
      id: 3,
      name: "Ramesh Patel",
      email: "--",
      role: "Builder",
      status: "inactive",
      phone: "556-343-4273",
      joined: "21 Oct, 2024",
    },
    {
      id: 4,
      name: "Satish Patel",
      email: "satishpatel65@gmail.com",
      role: "Admin",
      status: "active",
      phone: "903-759-6505",
      joined: "21 Oct, 2024",
    },
    {
      id: 5,
      name: "Suresh Jain",
      email: "sureshjain7546@gmail.com",
      role: "Admin",
      status: "inactive",
      phone: "626-679-1646",
      joined: "21 Oct, 2024",
    },
    {
      id: 6,
      name: "Nitin Joshi",
      email: "joshtintin132@gmail.com",
      role: "Supervisor",
      status: "inactive",
      phone: "684-742-2531",
      joined: "21 Oct, 2024",
    },
    {
      id: 7,
      name: "Mihir Sharma",
      email: "mihirsharma2@gmail.com",
      role: "Supervisor",
      status: "active",
      phone: "715-686-9794",
      joined: "21 Oct, 2024",
    },
    {
      id: 8,
      name: "Aashutosh Sharma",
      email: "aashutoshsharma01@gmail.com",
      role: "Builder",
      status: "inactive",
      phone: "874-768-4777",
      joined: "21 Oct, 2024",
    },
    {
      id: 9,
      name: "Jatin Shah",
      email: "jatinshah98@gmail.com",
      role: "Admin",
      status: "active",
      phone: "902-499-1355",
      joined: "21 Oct, 2024",
    },
  ];

  const filteredUsers = users.filter((user) => {
    if (activeTab === "All") return true;
    return user.role.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6 p-4 bg-gray-100 w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">
            Manage your application users by role and activity.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-7 items-center border-b-2 border-gray-300 pb-2">
        {["All", "Admin", "Supervisor", "Builder"].map((tab) => (
          <h1
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer transition-colors ${
              activeTab === tab
                ? "text-[#B02E0C] font-semibold underline"
                : "text-gray-600"
            } hover:text-[#B02E0C] hover:underline`}
          >
            {tab}
          </h1>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg overflow-hidden">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-gray-200 bg-gray-50 relative">
          <h2 className="text-lg font-semibold p-4 text-gray-800">
            Users – {activeTab}
          </h2>
          <div className="flex items-center gap-3 p-4 relative">
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B02E0C]"
            />
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 relative"
            >
              Export
            </button>

            {/* Export Dropdown */}
            {exportOpen && (
              <div className="absolute top-14 right-4 bg-white shadow-lg border border-gray-200 rounded-md w-28 z-20">
                <ul className="text-gray-700 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    PDF
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    CSV
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold"></th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Name & Role
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Email
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Contact Number
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Joined
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold text-center"></th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#B02E0C] rounded focus:ring-[#B02E0C]"
                  />
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.email}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.phone}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.joined}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === user.id ? null : user.id)
                    }
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <EllipsisVertical className="text-gray-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === user.id && (
                    <div className="absolute right-4 top-10 bg-white border border-gray-200 shadow-lg rounded-md w-44 z-30">
                      <ul className="text-gray-700 text-sm">
                        {/* <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                          <Eye size={16} /> View Profile
                        </li> */}
                        <li
                          onClick={() => setSelectedUser(user)}
                          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <Eye size={16} /> View Profile
                        </li>
                        <li
                          onClick={() => {
                            setShowResetModal(true);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <Lock size={16} /> Reset Password
                        </li>
                        <li
                          onClick={() => {
                            setShowSuspendModal(true);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-50 cursor-pointer"
                        >
                          <Ban size={16} /> Suspend User
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {selectedUser && (
        <div className="w-1/3 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden ml-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">{selectedUser.name}</h2>
            <p className="text-gray-600">{selectedUser.role}</p>
            <div className="mt-4">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Joined:</strong> {selectedUser.joined}
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* ----------------- Reset Password Modal ----------------- */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50">
          <div className="bg-white rounded-xl w-[400px] p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Reset Password</h2>
              <button onClick={() => setShowResetModal(false)}>
                <X className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-[#B02E0C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  >
                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-[#B02E0C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md bg-[#B02E0C] text-white hover:bg-[#8d270b] cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- Suspend User Modal ----------------- */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Suspend User</h2>
              <button onClick={() => setShowSuspendModal(false)}>
                <X className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to suspend this user? This action is
              irreversible.
            </p>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Reason for Suspend*
              </label>
              <textarea
                placeholder="Enter reason"
                rows="3"
                className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-[#B02E0C] outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md bg-[#B02E0C] text-white hover:bg-[#8d270b] cursor-pointer">
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
