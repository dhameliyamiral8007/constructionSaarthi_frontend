import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisVertical, Eye, Lock, Ban, X } from "lucide-react";
import {
  addGavgeType,
  deleteGavge,
  fetchAllGavge,
  updateGavge,
} from "../../../redux/slice/Types/GavgeTypeSlice";

const Gavge = () => {
  const dispatch = useDispatch();
  const { Gavges, loading, error } = useSelector((state) => state.gavge);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showGavgeModal, setShowGavgeModal] = useState(false);
  const [selectedGavge, setSelectedGavge] = useState(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formState, setFormState] = useState({
    gavgeName: "",
    gavgeFormat: "",
  });

  useEffect(() => {
    dispatch(fetchAllGavge());
  }, [dispatch]);

  const openAddModal = () => {
    setSelectedGavge(null);
    setFormState({ gavgeName: "", gavgeFormat: "" });
    setShowGavgeModal(true);
  };

  const openEditModal = (item) => {
    setSelectedGavge(item);
    setFormState({
      gavgeName: item.gavgeName,
      gavgeFormat: item.gavgeFormat || "",
    });
    setShowGavgeModal(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = {
      gavgeName: formState.gavgeName,
      gavgeFormat: formState.gavgeFormat,
    };

    if (selectedGavge) {
      dispatch(updateGavge({ id: selectedGavge.id, updatedData: payload }))
        .unwrap()
        .then(() => {
          setShowGavgeModal(false);
          dispatch(fetchAllGavge());
        });
    } else {
      dispatch(addGavgeType(payload))
        .unwrap()
        .then(() => {
          setShowGavgeModal(false);
          dispatch(fetchAllGavge());
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
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gavge</h1>

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Add Gavge Type
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300"></th>
              <th className="py-3 px-4 border border-gray-300">GavgeName</th>
              <th className="py-3 px-4 border border-gray-300">GavgeFormat</th>
              <th className="py-3 px-4 border border-gray-300">Date</th>
              <th className="py-3 px-4 border border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(Gavges) && Gavges.length > 0 ? (
              Gavges.map((gavge) => (
                <tr key={gavge.id}>
                  <td className="py-3 px-4 border border-gray-300">
                    <input type="checkbox" />
                  </td>

                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {gavge.gavgeName || "N/A"}{" "}
                    {/* Ensure this property exists */}
                  </td>

                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {gavge.gavgeFormat || "N/A"}{" "}
                    {/* Ensure this property exists */}
                  </td>

                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {new Date(gavge.createdAt).toLocaleDateString() || "N/A"}{" "}
                    {/* Fallback */}
                  </td>

                  <td className="py-3 px-4 border border-gray-300 text-center relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === gavge.id ? null : gavge.id)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <EllipsisVertical />
                    </button>
                    {openMenuId === gavge.id && (
                      <div className="absolute right-2 top-14 bg-white border-2 border-gray-300 shadow-lg rounded-md w-40 z-50">
                        <ul className="text-sm">
                          <li className="hover:bg-gray-300">
                            <button
                              onClick={() => openEditModal(gavge)}
                              className="px-4 py-2 cursor-pointer flex gap-2"
                            >
                              <Eye size={18} className="mr-2" />
                              View
                            </button>
                          </li>
                          <li className="hover:bg-gray-300">
                            <button
                              onClick={() => openEditModal(gavge)}
                              className="px-4 py-2 cursor-pointer flex gap-2"
                            >
                              <Lock size={18} className="mr-2" />
                              Edit
                            </button>
                          </li>
                          <li className="hover:bg-gray-300">
                            <button
                              onClick={() => {
                                setSelectedGavge(gavge);
                                setShowDeleteModal(true);
                              }}
                              className="px-4 py-2 cursor-pointer flex gap-2"
                            >
                              <Ban size={18} className="mr-2" />
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No gauges found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FOR ADDING/EDITING GAVGE */}
      {showGavgeModal && (
        <Modal
          title={selectedGavge ? "Edit Gavge Type" : "Add New Gavge Type"}
          onClose={() => setShowGavgeModal(false)}
        >
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gavge Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={formState.gavgeName}
                onChange={(e) =>
                  setFormState({ ...formState, gavgeName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gavge Format
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={formState.gavgeFormat}
                onChange={(e) =>
                  setFormState({ ...formState, gavgeFormat: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#B02E0C] text-white rounded-md"
            >
              {selectedGavge ? "Update" : "Create"} Gavge Type
            </button>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && selectedGavge && (
        <Modal
          title={`Delete ${selectedGavge.gavgeName}`}
          onClose={() => setShowDeleteModal(false)}
        >
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this Gavge Type?
          </p>

          <div className="space-x-4 text-center">
            <button
              onClick={() => {
                dispatch(deleteGavge(selectedGavge.id));
                setShowDeleteModal(false);
              }}
              className="py-2 px-4 bg-red-600 text-white rounded-md"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => setShowDeleteModal(false)}
              className="py-2 px-4 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Gavge;
