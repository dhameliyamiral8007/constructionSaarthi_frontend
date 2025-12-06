import { useState } from "react";
import {
  EllipsisVertical,
  Eye,
  Lock,
  Ban,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { Search } from "lucide-react";

const CouponManagement = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const couponmanagement = [
    {
      id: 1,
      name: "SAVE20",
      discounttype: "Percentage",
      discountvalue: "20%",
      validfrom: "01 Oct 2025",
      expirydate: "30 Oct 2025",
      usagelimit: "100 uses",
      usedcount: "45",
      status: "active",
      description: "Admin",
      createdAt: "903-759-6505",
    },
    // {
    //   id: 2,
    //   name: "Jatin Shah",
    //   description: "Supervisor",
    //   createdAt: "903-759-6505",
    // },
    // {
    //   id: 3,
    //   name: "Ramesh Patel",
    //   description: "Builder",
    //   createdAt: "903-759-6505",
    // },
    // {
    //   id: 4,
    //   name: "Satish Patel",
    //   description: "Admin",
    //   createdAt: "903-759-6505",
    // },
  ];

  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50">
      <div className="bg-white rounded-xl w-[400px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 bg-gray-100 w-full min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Coupon Management{" "}
          </h1>
          <p className="text-gray-600">
            Manage discount coupon codes for platform subscriptions or
            purchases.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Create New Coupon
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <div className="w-full p-4 bg-white flex items-center justify-between">
          {/* Left Title */}
          <h2 className="text-md font-semibold">
            Coupons <span className="text-gray-400 font-normal">- All</span>
          </h2>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Subscription Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Subscription Active</span>

              {/* Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#B02E0C] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            {/* Status Dropdown */}
            <select className="border border-gray-300 rounded-md focus:outline-none px-1 py-1 text-sm bg-white">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Coupons"
                className="border border-gray-300 rounded-md focus:outline-none px-1 py-1 text-sm w-52 pl-7 placeholder:text-[#060C12]"
              />
            </div>
          </div>
        </div>
        <table className=" overflow-x-auto overflow-scroll text-left border-t border-gray-200">
          <thead className="bg-gray-50 w-10">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-sm"></th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Coupon Code
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Discount Type
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Discount Value
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Valid From
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Expiry Date
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Usage Limit
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Used Count
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Status
              </th>
              <th className="py-3 px-4 border border-gray-300 text-gray-700 font-normal">
                Status
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {couponmanagement.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#B02E0C] rounded focus:ring-[#B02E0C]"
                  />
                </td>
                <td className="py-2 px-4 border border-gray-300 text-[#060C12] font-semibold">
                  {user.name}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.discounttype}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.discountvalue}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.validfrom}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.expirydate}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.usagelimit}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.usedcount}
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
                  {/* Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#B02E0C] transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </td>
                <td>
                  <div className="flex flex-row gap-4 py-5.5 px-4 border-b border-gray-300 text-gray-700">
                    <Eye className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <Trash2 className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponManagement;
