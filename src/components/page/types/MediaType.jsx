import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisVertical, Eye, Lock, Ban, X } from "lucide-react";
import {
  addMedia,
  fetchAllMedia,
  updateMedia,
} from "../../../redux/slice/Types/MediaSlice";

const Media = () => {
  const dispatch = useDispatch();
  const { mediaTypes, loading, error } = useSelector((state) => state.media);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchAllMedia());
  }, [dispatch]);

  // Check if mediaTypes is populated correctly
  useEffect(() => {
    console.log("Media Types:", mediaTypes); // Log the mediaTypes array
  }, [mediaTypes]);

  const isMediaLoaded = Array.isArray(mediaTypes);

  const openAddModal = () => {
    setSelectedMedia(null);
    setFormState({
      name: "",
      description: "",
    });
    setShowMediaModal(true);
  };

  const openEditModal = (feature) => {
    setSelectedMedia(feature);
    setFormState({
      name: feature.name,
      description: feature.description || "",
    });
    setShowMediaModal(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = {
      name: formState.name,
      description: formState.description,
    };

    if (selectedMedia) {
      dispatch(updateMedia({ id: selectedMedia.id, updatedData: payload }))
        .unwrap()
        .then(() => {
          setShowMediaModal(false);
          dispatch(fetchAllMedia());
        });
    } else {
      dispatch(addMedia(payload))
        .unwrap()
        .then(() => {
          setShowMediaModal(false);
          dispatch(fetchAllMedia());
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
          <h1 className="text-2xl font-bold text-gray-900">
            Feature Management
          </h1>
          <p className="text-gray-600">Manage all user features here.</p>
        </div>

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
        >
          + Add Feature
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 mt-4 rounded-lg">
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300"></th>
              <th className="py-3 px-4 border border-gray-300">Name</th>
              <th className="py-3 px-4 border border-gray-300 text-sm font-semibold">
                Description
              </th>
              <th className="py-3 px-4 border border-gray-300">Date</th>
              <th className="py-3 px-4 border border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isMediaLoaded && mediaTypes.length > 0 ? (
              mediaTypes.map((media) => (
                <tr key={media.id}>
                  <td className="py-3 px-4 border border-gray-300">
                    <input type="checkbox" />
                  </td>

                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {media.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {media.description}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-gray-700">
                    {new Date(media.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 border border-gray-300 text-center relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === media.id ? null : media.id)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <EllipsisVertical />
                    </button>

                    {openMenuId === media.id && (
                      <div className="absolute right-2 top-14 bg-white border-2 border-gray-300 shadow-lg rounded-md w-40 z-50">
                        <ul className="text-sm">
                          <li
                            onClick={() => {
                              setSelectedMedia(media);
                              setShowOpenModal(true);
                            }}
                            className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex gap-2"
                          >
                            <Eye size={16} /> Open
                          </li>
                          <li
                            onClick={() => openEditModal(media)}
                            className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex gap-2"
                          >
                            <Lock size={16} /> Edit
                          </li>
                          <li
                            onClick={() => {
                              setSelectedMedia(media);
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
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  {loading ? "Loading..." : "No media available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showMediaModal && (
        <Modal
          title={selectedMedia ? "Edit Media" : "Add New Media"}
          onClose={() => setShowMediaModal(false)}
        >
          <form onSubmit={handleSubmitForm}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMediaModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B02E0C] text-white rounded-md hover:bg-[#8d270b]"
                >
                  {selectedMedia ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Media;
