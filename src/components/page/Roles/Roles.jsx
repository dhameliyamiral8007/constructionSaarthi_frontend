import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisVertical, Eye, Lock, Ban, X } from "lucide-react";
import {
  createRole,
  deleteRole,
  fetchAllRoles,
  updateRole,
} from "../../../redux/slice/RolesPermission/RolesSlice";

const Roles = () => {
  const dispatch = useDispatch();
  const { Roles, loading, error } = useSelector((state) => state.role);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    dispatch(fetchAllRoles());
  }, [dispatch]);

  const openAddModal = () => {
    setSelectedRole(null);
    setFormState({
      name: "",
      description: "",
      is_active: true,
    });
    setShowRoleModal(true);
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setFormState({
      name: role.name,
      description: role.description || "",
    });
    setShowRoleModal(true);
  };

  const handleSubmitRole = (e) => {
    e.preventDefault();

    const payload = {
      name: formState.name,
      description: formState.description,
      is_active: formState.is_active,
    };

    if (selectedRole) {
      dispatch(updateRole({ id: selectedRole.id, updatedData: payload }))
        .unwrap()
        .then(() => {
          setShowRoleModal(false);
          dispatch(fetchAllRoles());
        });
    } else {
      dispatch(createRole(payload))
        .unwrap()
        .then(() => {
          setShowRoleModal(false);
          dispatch(fetchAllRoles());
        });
    }
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
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 bg-gray-100 w-full min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
          <p className="text-gray-600">Manage all user roles here.</p>
        </div>

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Add Role
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300"></th>
              <th className="py-3 px-4 border border-gray-300">Name</th>
              <th className="py-3 px-4 border border-gray-300">Date</th>
              <th className="py-3 px-4 border border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : Roles && Roles.length > 0 ? (
              Roles.map((role) => (
                <tr key={role.id}>
                  <td className="py-3 px-4 border border-gray-300">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#B02E0C] rounded focus:ring-[#B02E0C]"
                    />
                  </td>

                  <td className="py-3 px-4 border border-gray-300">
                    {role.name}
                  </td>

                  <td className="py-3 px-4 border border-gray-300">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 border border-gray-300 text-center relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === role.id ? null : role.id)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <EllipsisVertical />
                    </button>

                    {openMenuId === role.id && (
                      <div className="absolute right-2 top-14 bg-white border-2 border-gray-300 shadow-lg rounded-md w-40 z-50">
                        <ul className="text-sm">
                          <li
                            onClick={() => {
                              setSelectedRole(role);
                              setShowOpenModal(true);
                            }}
                            className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex gap-2"
                          >
                            <Eye size={16} /> Open
                          </li>
                          <li
                            onClick={() => openEditModal(role)}
                            className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex gap-2"
                          >
                            <Lock size={16} /> Edit
                          </li>
                          <li
                            onClick={() => {
                              setSelectedRole(role);
                              setShowDeleteModal(true);
                            }}
                            className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex gap-2 text-red-600"
                          >
                            <Ban size={16} /> Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No roles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showRoleModal && (
        <Modal
          title={selectedRole ? "Edit Role" : "Add New Role"}
          onClose={() => setShowRoleModal(false)}
        >
          <form onSubmit={handleSubmitRole} className="space-y-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
              autoFocus
            />

            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            />

            <button
              type="submit"
              className="bg-[#B02E0C] text-white px-4 py-2 rounded-md w-full"
            >
              {selectedRole ? "Update Role" : "Create Role"}
            </button>
          </form>
        </Modal>
      )}

      {showOpenModal && selectedRole && (
        <Modal
          title="View Role Details"
          onClose={() => setShowOpenModal(false)}
        >
          <p>
            <strong>Name:</strong> {selectedRole.name}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedRole.createdAt).toLocaleString()}
          </p>
        </Modal>
      )}

      {showDeleteModal && selectedRole && (
        <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
          <p>
            Are you sure you want to delete <strong>{selectedRole.name}</strong>
            ?
          </p>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                dispatch(deleteRole(selectedRole.id)).then(() => {
                  setShowDeleteModal(false);
                });
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

export default Roles;
