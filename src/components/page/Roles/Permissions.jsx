import { useEffect, useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPermission,
  addPermission,
  updatePermission,
  deletePermission,
} from "../../../redux/slice/RolesPermission/PermissionSlice";
import { fetchAllRoles } from "../../../redux/slice/RolesPermission/RolesSlice";
import { fetchAllFeature } from "../../../redux/slice/RolesPermission/FeatureSlice";

const Permissions = () => {
  const dispatch = useDispatch();
  const { Permissions, loading, error } = useSelector(
    (state) => state.permission
  );

  const { Roles } = useSelector((state) => state.role); // get roles from Redux
  const { Features } = useSelector((state) => state.feature); // get features from Redux

  useEffect(() => {
    dispatch(fetchAllRoles());
    dispatch(fetchAllFeature());
  }, [dispatch]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formState, setFormState] = useState({
    role_id: "",
    feature_id: "",
    can_read: true,
    can_edit: true,
    can_delete: true,
    can_create: true,
    can_view: true,
  });

  useEffect(() => {
    dispatch(fetchAllPermission());
  }, [dispatch]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formState.role_id || !formState.feature_id) {
      alert("Please select role and feature");
      return;
    }

    dispatch(addPermission(formState)).then((res) => {
      if (!res.error) {
        alert("Permission added successfully!");
        setShowAddModal(false);
        setFormState({
          role_id: "",
          feature_id: "",
          can_read: true,
          can_edit: true,
          can_delete: true,
          can_create: true,
          can_view: true,
        });
        dispatch(fetchAllPermission()); // refresh table
      } else {
        alert(res.payload || "Failed to add permission");
      }
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updatePermission({ id: selectedUser.id, payload: formState })
    ).then((res) => {
      if (!res.error) {
        alert("Updated Successfully!");
        setShowEditModal(false);
        dispatch(fetchAllPermission());
      }
    });
  };

  const handleDelete = () => {
    dispatch(deletePermission(selectedUser.id)).then((res) => {
      if (!res.error) {
        alert("Deleted successfully!");
        setShowDeleteModal(false);
        dispatch(fetchAllPermission()); // refresh list
      } else {
        alert("Delete failed: " + res.payload);
      }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Permissions Management
          </h1>
          <p className="text-gray-600">Manage all user permissions here.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Add Permissions
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <div className="flex justify-between items-center border-b border-gray-200 bg-gray-50 relative">
          <div className="flex items-center gap-3 p-4 relative">
            <input
              type="text"
              placeholder="Search permissions..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B02E0C]"
            />
          </div>
        </div>
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold"></th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Role
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Feature
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Read
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Edit
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Delete
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Create
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                View
              </th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-4 px-4 text-center text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : Permissions && Permissions.length > 0 ? (
              Permissions.map((permission) => (
                <tr key={permission.id}>
                  <td className="py-3 px-4 border border-gray-300">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#B02E0C] rounded focus:ring-[#B02E0C]"
                    />
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {Roles.find((r) => r.id === permission.role_id)?.name ||
                      "N/A"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {Features.find((f) => f.id === permission.feature_id)
                      ?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {permission.can_read ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {permission.can_edit ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {permission.can_delete ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {permission.can_create ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {permission.can_view ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-center relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === permission.id ? null : permission.id
                        )
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <EllipsisVertical className="text-gray-600" />
                    </button>

                    {openMenuId === permission.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-md rounded-md w-32 z-50">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedUser(permission);
                            setShowOpenModal(true);
                            setOpenMenuId(null);
                          }}
                        >
                          open
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedUser(permission);
                            setFormState({ ...permission });
                            setShowEditModal(true);
                            setOpenMenuId(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 hover:bg-gray-300 w-full cursor-pointer flex gap-2 text-red-600"
                          onClick={() => {
                            setSelectedUser(permission);
                            setShowDeleteModal(true);
                            setOpenMenuId(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 px-4 text-center text-gray-500">
                  No permissions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Permission Modal */}
      {showAddModal && (
        <Modal
          title="Add New Permissions"
          onClose={() => setShowAddModal(false)}
        >
          <form className="space-y-4" onSubmit={handleSave}>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role_id"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B02E0C]"
              value={formState.role_id}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                Select Role
              </option>
              {Roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Feature
            </label>
            <select
              name="feature_id"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B02E0C]"
              value={formState.feature_id}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                Select Feature
              </option>
              {Features.map((feature) => (
                <option key={feature.id} value={feature.id}>
                  {feature.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                "can_read",
                "can_edit",
                "can_delete",
                "can_create",
                "can_view",
              ].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={perm}
                    checked={formState[perm]}
                    onChange={handleFormChange}
                    className="text-[#B02E0C] focus:ring-[#B02E0C]"
                  />
                  <span>
                    {perm.replace("can_", "").replace("_", " ").toUpperCase()}
                  </span>
                </label>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#B02E0C] text-white px-4 py-2 rounded-md hover:bg-[#8d270b] w-full"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Open Modal */}
      {showOpenModal && selectedUser && (
        <Modal
          title="View Role Details"
          onClose={() => setShowOpenModal(false)}
        >
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Feature:</strong> {selectedUser.feature}
            </p>
            <p>
              <strong>Read Permission:</strong> {selectedUser.can_read}
            </p>
            <p>
              <strong>Edit Permission:</strong> {selectedUser.can_edit}
            </p>
            <p>
              <strong>Delete Permission:</strong> {selectedUser.can_delete}
            </p>
            <p>
              <strong>Create Permission:</strong> {selectedUser.can_create}
            </p>
            <p>
              <strong>View Permission:</strong> {selectedUser.can_view}
            </p>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <Modal title="Edit Permission" onClose={() => setShowEditModal(false)}>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>

            <select
              name="role_id"
              className="w-full border px-3 py-2 rounded-md"
              value={formState.role_id}
              onChange={handleFormChange}
            >
              {Roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <label>Feature</label>
            <select
              name="feature_id"
              className="w-full border px-3 py-2 rounded-md"
              value={formState.feature_id}
              onChange={handleFormChange}
            >
              {Features.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              {[
                "can_read",
                "can_edit",
                "can_delete",
                "can_create",
                "can_view",
              ].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={perm}
                    checked={formState[perm]}
                    onChange={handleFormChange}
                  />
                  <span>{perm.replace("can_", "").toUpperCase()}</span>
                </label>
              ))}
            </div>

            <button className="bg-[#B02E0C] w-full text-white px-4 py-2 rounded-md">
              Update
            </button>
          </form>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
          {/* <p>
            Are you sure you want to delete permission
            <strong>{selectedUser.name}</strong>?
          </p> */}

          <p>
            Are you sure you want to delete permission for role
            <strong>
              {" "}
              {Roles.find((r) => r.id === selectedUser.role_id)?.name || "N/A"}
            </strong>{" "}
            and feature
            <strong>
              {" "}
              {Features.find((f) => f.id === selectedUser.feature_id)?.name ||
                "N/A"}
            </strong>
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
              onClick={handleDelete}
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

export default Permissions;
