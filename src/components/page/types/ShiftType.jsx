import { useState } from "react";
import { EllipsisVertical, Eye, Lock, Ban, X } from "lucide-react";

const Shift = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const shift = [
    {
      id: 1,
      name: "Aashutosh Sharma",
      description: "Admin",
      createdAt: "903-759-6505",
    },
    {
      id: 2,
      name: "Jatin Shah",
      description: "Supervisor",
      createdAt: "903-759-6505",
    },
    {
      id: 3,
      name: "Ramesh Patel",
      description: "Builder",
      createdAt: "903-759-6505",
    },
    {
      id: 4,
      name: "Satish Patel",
      description: "Admin",
      createdAt: "903-759-6505",
    },
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
          <h1 className="text-2xl font-bold text-gray-900">Shift</h1>
          {/* <p className="text-gray-600">Manage all user feature here.</p> */}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Add Shift Type
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <div className="flex justify-between items-center border-b border-gray-200 bg-gray-50 relative">
          <div className="flex items-center gap-3 p-4 relative">
            <input
              type="text"
              placeholder="Search shift..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B02E0C]"
            />
          </div>
        </div>

        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold"></th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Name
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Description
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Date
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {shift.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#B02E0C] rounded focus:ring-[#B02E0C]"
                  />
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.description}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-gray-700">
                  {user.createdAt}
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

                  {openMenuId === user.id && (
                    <div className="absolute right-1 top-14 -mt-2 bg-white border-2 border-gray-300 shadow-lg rounded-md w-40 z-50">
                      <ul className="text-sm">
                        <li
                          onClick={() => {
                            setSelectedUser(user);
                            setShowOpenModal(true);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-300 cursor-pointer"
                        >
                          <Eye size={16} /> Open
                        </li>
                        <li
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-300 cursor-pointer"
                        >
                          <Lock size={16} /> Edit
                        </li>
                        <li
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-300 cursor-pointer"
                        >
                          <Ban size={16} /> Delete
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

      {/* Add Feature Modal */}
      {showAddModal && (
        <Modal title="Add New Shift" onClose={() => setShowAddModal(false)}>
          <form className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              placeholder="description"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <button className="bg-[#B02E0C] text-white px-4 py-2 rounded-md hover:bg-[#8d270b]">
              Save
            </button>
          </form>
        </Modal>
      )}

      {/* Open Modal */}
      {showOpenModal && selectedUser && (
        <Modal
          title="View Shift Details"
          onClose={() => setShowOpenModal(false)}
        >
          <div className="space-y-2">
            <p>
              <strong>Shift Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedUser.description}
            </p>
            <p>
              <strong>Date:</strong> {selectedUser.createdAt}
            </p>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <Modal title="Edit Shift" onClose={() => setShowEditModal(false)}>
          <form className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue={selectedUser.name}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700">
              description
            </label>
            <input
              type="text"
              defaultValue={selectedUser.description}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <button className="bg-[#B02E0C] text-white px-4 py-2 rounded-md hover:bg-[#8d270b]">
              Update
            </button>
          </form>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
          <p>
            Are you sure you want to delete <strong>{selectedUser.name}</strong>
            ?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                alert(`${selectedUser.name} deleted`);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Shift;
