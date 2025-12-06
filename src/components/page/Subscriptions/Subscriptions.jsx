import React, { use, useState } from "react";
import { EllipsisVertical, Eye, Lock, Ban, X, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const [planOpen, setPlanOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleManagePlans = () => {
    navigate("/manage-plans");
  };

  const users = [
    {
      id: 1,
      name: "Aashutosh Sharma",
      role: "Admin",
      plan: "12 Months",
      amount: "₹12,000",
      nextRenewal: "21 Oct, 2025",
      status: "Active",
      phone: "347-452-3594",
      joined: "21 Oct, 2024",
    },
    {
      id: 2,
      name: "Jatin Shah",
      role: "Supervisor",
      plan: "6 Months",
      amount: "₹6,000",
      nextRenewal: "15 Apr, 2025",
      status: "Expired",
      phone: "551-694-5325",
      joined: "15 Oct, 2024",
    },
    {
      id: 3,
      name: "Ramesh Patel",
      role: "Builder",
      plan: "Monthly",
      amount: "₹1,200",
      nextRenewal: "01 Nov, 2024",
      status: "Active",
      phone: "556-343-4273",
      joined: "21 Oct, 2024",
    },
    {
      id: 4,
      name: "Satish Patel",
      role: "Admin",
      plan: "3 Months",
      amount: "₹3,500",
      nextRenewal: "21 Jan, 2025",
      status: "Active",
      phone: "903-759-6505",
      joined: "21 Oct, 2024",
    },
    {
      id: 5,
      name: "Suresh Jain",
      role: "Admin",
      plan: "6 Months",
      amount: "₹6,000",
      nextRenewal: "21 Apr, 2025",
      status: "Expired",
      phone: "626-679-1646",
      joined: "21 Oct, 2024",
    },
    {
      id: 6,
      name: "Nitin Joshi",
      role: "Supervisor",
      plan: "Monthly",
      amount: "₹1,200",
      nextRenewal: "01 Nov, 2024",
      status: "Active",
      phone: "684-742-2531",
      joined: "21 Oct, 2024",
    },
    {
      id: 7,
      name: "Mihir Sharma",
      role: "Supervisor",
      plan: "12 Months",
      amount: "₹12,000",
      nextRenewal: "21 Oct, 2025",
      status: "Expired",
      phone: "715-686-9794",
      joined: "21 Oct, 2024",
    },
    {
      id: 8,
      name: "Aashutosh Sharma",
      role: "Builder",
      plan: "3 Months",
      amount: "₹3,500",
      nextRenewal: "21 Jan, 2025",
      status: "Active",
      phone: "874-768-4777",
      joined: "21 Oct, 2024",
    },
    {
      id: 9,
      name: "Jatin Shah",
      role: "Admin",
      plan: "6 Months",
      amount: "₹6,000",
      nextRenewal: "15 Apr, 2025",
      status: "Active",
      phone: "902-499-1355",
      joined: "21 Oct, 2024",
    },
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-100 w-full min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600">
            Keep track of all user subscriptions effortlessly
          </p>
        </div>
        <div>
          <button onClick={() => handleManagePlans()} className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]">
            Manage Plans
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 bg-gray-50 relative">
          <h2 className="text-lg font-semibold p-4 text-gray-800">Users</h2>
          <div className="flex items-center gap-3 p-4 relative">
            <button
              onClick={() => setPlanOpen(!planOpen)}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 relative"
            >
              Plan Type
            </button>
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

            {/* plan Dropdown */}
            {planOpen && (
              <div className="absolute top-16 bg-white shadow-lg border border-gray-200 rounded-md w-32 z-20">
                <ul className="text-gray-700 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    Monthly
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    3 Month Plan
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    6 Months Plan
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    12 Moths Plan
                  </li>
                </ul>
              </div>
            )}
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
                Name
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Contact Number
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Plan
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Status
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Amount
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                joined
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Next Renewal
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold text-center"></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
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
                  {user.phone}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.plan}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  <div className="px-2.5 py-1.5 border-2 border-green-300 bg-green-100 rounded-full flex flex-row gap-1">
                    {" "}
                    <div className="rounded-full mt-[0.6rem] w-2 h-2 bg-[#04B440]"></div>
                    <span className="text-[#04B440] font-semibold">
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.amount}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.joined}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.nextRenewal}
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

export default Subscriptions;
