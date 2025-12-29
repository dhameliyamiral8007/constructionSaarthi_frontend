import { useState, useEffect } from "react";
import {
  EllipsisVertical,
  Eye,
  Lock,
  Ban,
  X,
  Pencil,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import { Search } from "lucide-react";
import { apiInstance } from "../../../config/axiosInstance";

const CouponManagement = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Coupon Criteria state
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [loadingCriteria, setLoadingCriteria] = useState(false);
  const [errorCriteria, setErrorCriteria] = useState(null);
  const [successCriteria, setSuccessCriteria] = useState(null);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [showEditCriteriaModal, setShowEditCriteriaModal] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // Form state for criteria
  const [criteriaFormData, setCriteriaFormData] = useState({
    attach_phone: false,
    attach_email: false,
    reason_place_id: false,
    date_range: false,
    for_new: false,
    for_existing_with_condition: false,
    for_existing_non_condition: false,
    need_map_existing_user: false,
    need_map_upcoming_user: false,
  });

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

  // Fetch coupon criteria
  const fetchCriteria = async () => {
    setLoadingCriteria(true);
    setErrorCriteria(null);
    try {
      const response = await apiInstance.get(`/api/coupon`);
      if (response.data && response.data.data) {
        setCriteria(response.data.data);
      } else {
        setErrorCriteria("Failed to fetch coupon criteria");
      }
    } catch (err) {
      console.error("Error fetching criteria:", err);
      setErrorCriteria(err.response?.data?.message || "Failed to fetch coupon criteria");
    } finally {
      setLoadingCriteria(false);
    }
  };

  // Handle input change for criteria form
  const handleCriteriaInputChange = (e) => {
    const { name, type, checked } = e.target;
    setCriteriaFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : e.target.value
    }));
  };

  // Handle create criteria
  const handleCreateCriteria = async (e) => {
    e.preventDefault();
    setErrorCriteria(null);
    setSuccessCriteria(null);

    try {
      const response = await apiInstance.post(
        `/api/coupon/createCouponCriteria`,
        criteriaFormData
      );

      if (response.status === 200 || response.status === 201 || response.data?.success) {
        setSuccessCriteria("Coupon criteria created successfully!");
        setShowAddCriteriaModal(false);
        resetCriteriaForm();
        fetchCriteria();
        setTimeout(() => {
          setSuccessCriteria(null);
        }, 3000);
      } else {
        setErrorCriteria(response.data?.message || "Failed to create coupon criteria");
      }
    } catch (err) {
      console.error("Error creating criteria:", err);
      setErrorCriteria(err.response?.data?.message || "Failed to create coupon criteria");
    }
  };

  // Handle update criteria
  const handleUpdateCriteria = async (e) => {
    e.preventDefault();
    if (!selectedCriteria) return;

    setErrorCriteria(null);
    setSuccessCriteria(null);

    try {
      const response = await apiInstance.put(
        `/api/coupon/${selectedCriteria.id}`,
        criteriaFormData
      );

      if (response.status === 200 || response.status === 201 || response.data?.success) {
        setSuccessCriteria("Coupon criteria updated successfully!");
        setShowEditCriteriaModal(false);
        setSelectedCriteria(null);
        resetCriteriaForm();
        fetchCriteria();
        setTimeout(() => {
          setSuccessCriteria(null);
        }, 3000);
      } else {
        setErrorCriteria(response.data?.message || "Failed to update coupon criteria");
      }
    } catch (err) {
      console.error("Error updating criteria:", err);
      setErrorCriteria(err.response?.data?.message || "Failed to update coupon criteria");
    }
  };

  // Handle delete criteria
  const handleDeleteCriteria = async (criteriaId) => {
    if (!window.confirm("Are you sure you want to delete this coupon criteria?")) {
      return;
    }

    setDeletingId(criteriaId);
    setErrorCriteria(null);
    setSuccessCriteria(null);

    try {
      const response = await apiInstance.delete(`/api/coupon/${criteriaId}`);

      if (response.status === 200 || response.status === 204 || response.data?.success) {
        setSuccessCriteria("Coupon criteria deleted successfully!");
        fetchCriteria();
        setTimeout(() => {
          setSuccessCriteria(null);
        }, 3000);
      } else {
        setErrorCriteria(response.data?.message || "Failed to delete coupon criteria");
      }
    } catch (err) {
      console.error("Error deleting criteria:", err);
      setErrorCriteria(err.response?.data?.message || "Failed to delete coupon criteria");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle edit click
  const handleEditClick = (criteriaItem) => {
    setSelectedCriteria(criteriaItem);
    setCriteriaFormData({
      attach_phone: criteriaItem.attach_phone || false,
      attach_email: criteriaItem.attach_email || false,
      reason_place_id: criteriaItem.reason_place_id || false,
      date_range: criteriaItem.date_range || false,
      for_new: criteriaItem.for_new || false,
      for_existing_with_condition: criteriaItem.for_existing_with_condition || false,
      for_existing_non_condition: criteriaItem.for_existing_non_condition || false,
      need_map_existing_user: criteriaItem.need_map_existing_user || false,
      need_map_upcoming_user: criteriaItem.need_map_upcoming_user || false,
    });
    setShowEditCriteriaModal(true);
  };

  // Reset criteria form
  const resetCriteriaForm = () => {
    setCriteriaFormData({
      attach_phone: false,
      attach_email: false,
      reason_place_id: false,
      date_range: false,
      for_new: false,
      for_existing_with_condition: false,
      for_existing_non_condition: false,
      need_map_existing_user: false,
      need_map_upcoming_user: false,
    });
  };

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
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
          >
            + Create New Coupon
          </button>
          <button
            onClick={() => {
              setShowCriteriaModal(true);
              fetchCriteria();
            }}
            className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
          >
            Coupon Criteria
          </button>
        </div>
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

      {/* Coupon Criteria Modal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl w-[90%] max-w-6xl p-6 relative my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Coupon Criteria</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddCriteriaModal(true);
                    resetCriteriaForm();
                  }}
                  className="px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b] flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Criteria
                </button>
                <button
                  onClick={() => {
                    setShowCriteriaModal(false);
                    setErrorCriteria(null);
                    setSuccessCriteria(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {errorCriteria && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errorCriteria}
              </div>
            )}
            {successCriteria && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {successCriteria}
              </div>
            )}

            {/* Criteria Table */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                {loadingCriteria ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="animate-spin text-[#B02E0C]" size={32} />
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">ID</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Attach Phone</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Attach Email</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Reason Place ID</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Date Range</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">For New</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">For Existing (Condition)</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">For Existing (Non-Condition)</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Map Existing User</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Map Upcoming User</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">Status</th>
                        <th className="py-3 px-4 border border-gray-300 text-sm font-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteria.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="py-8 text-center text-gray-500">
                            No criteria found. Click "Add Criteria" to add one.
                          </td>
                        </tr>
                      ) : (
                        criteria.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">{item.id}</td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.attach_phone ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.attach_email ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.reason_place_id ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.date_range ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.for_new ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.for_existing_with_condition ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.for_existing_non_condition ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.need_map_existing_user ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-gray-700">
                              {item.need_map_upcoming_user ? "Yes" : "No"}
                            </td>
                            <td className="py-3 px-4 border border-gray-300">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                item.is_active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {item.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-center">
                              <div className="flex justify-center gap-2">
                                {deletingId === item.id ? (
                                  <Loader2 className="animate-spin text-red-600" size={18} />
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditClick(item)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil size={18} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteCriteria(item.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Criteria Modal */}
      {showAddCriteriaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl w-[90%] max-w-3xl p-6 relative my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Coupon Criteria</h2>
              <button
                onClick={() => {
                  setShowAddCriteriaModal(false);
                  resetCriteriaForm();
                  setErrorCriteria(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {errorCriteria && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errorCriteria}
              </div>
            )}

            <form onSubmit={handleCreateCriteria} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="attach_phone"
                    checked={criteriaFormData.attach_phone}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Attach Phone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="attach_email"
                    checked={criteriaFormData.attach_email}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Attach Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="reason_place_id"
                    checked={criteriaFormData.reason_place_id}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Reason Place ID</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="date_range"
                    checked={criteriaFormData.date_range}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Date Range</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_new"
                    checked={criteriaFormData.for_new}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_existing_with_condition"
                    checked={criteriaFormData.for_existing_with_condition}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For Existing (With Condition)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_existing_non_condition"
                    checked={criteriaFormData.for_existing_non_condition}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For Existing (Non-Condition)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="need_map_existing_user"
                    checked={criteriaFormData.need_map_existing_user}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Need Map Existing User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="need_map_upcoming_user"
                    checked={criteriaFormData.need_map_upcoming_user}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Need Map Upcoming User</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCriteriaModal(false);
                    resetCriteriaForm();
                    setErrorCriteria(null);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#B02E0C] text-white hover:bg-[#8d270b] cursor-pointer"
                >
                  Create Criteria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Criteria Modal */}
      {showEditCriteriaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl w-[90%] max-w-3xl p-6 relative my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Coupon Criteria</h2>
              <button
                onClick={() => {
                  setShowEditCriteriaModal(false);
                  setSelectedCriteria(null);
                  resetCriteriaForm();
                  setErrorCriteria(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {errorCriteria && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errorCriteria}
              </div>
            )}

            <form onSubmit={handleUpdateCriteria} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="attach_phone"
                    checked={criteriaFormData.attach_phone}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Attach Phone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="attach_email"
                    checked={criteriaFormData.attach_email}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Attach Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="reason_place_id"
                    checked={criteriaFormData.reason_place_id}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Reason Place ID</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="date_range"
                    checked={criteriaFormData.date_range}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Date Range</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_new"
                    checked={criteriaFormData.for_new}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_existing_with_condition"
                    checked={criteriaFormData.for_existing_with_condition}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For Existing (With Condition)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="for_existing_non_condition"
                    checked={criteriaFormData.for_existing_non_condition}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>For Existing (Non-Condition)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="need_map_existing_user"
                    checked={criteriaFormData.need_map_existing_user}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Need Map Existing User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="need_map_upcoming_user"
                    checked={criteriaFormData.need_map_upcoming_user}
                    onChange={handleCriteriaInputChange}
                    className="w-4 h-4"
                    style={{ accentColor: '#B02E0C' }}
                  />
                  <span>Need Map Upcoming User</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCriteriaModal(false);
                    setSelectedCriteria(null);
                    resetCriteriaForm();
                    setErrorCriteria(null);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#B02E0C] text-white hover:bg-[#8d270b] cursor-pointer"
                >
                  Update Criteria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponManagement;
