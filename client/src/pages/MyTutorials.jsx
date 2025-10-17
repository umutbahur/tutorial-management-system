import { useEffect, useState } from "react";
import { Link } from 'react-router';
import { useTutorialService } from "../services/TutorialService";
import EditTutorialModal from "../components/EditTutorialModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function MyTutorials() {
  const { getMyTutorials, remove } = useTutorialService();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchMyTutorials = async () => {
    try {
      const { data } = await getMyTutorials();
      setTutorials(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tutorials");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMyTutorials();
  }, []);

  const handleEdit = (tutorial) => {
    setSelectedTutorial(tutorial);
    setEditOpen(true);
  };

  const handleUpdated = (updatedTutorial) => {
    setTutorials((prev) =>
      prev.map((t) => (t.id === updatedTutorial.id ? updatedTutorial : t))
    );
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setTutorials((prev) => prev.filter((t) => t.id !== id));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Failed to delete tutorial:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 p-6">Loading your tutorials...</p>;
  if (error)
    return <p className="text-center text-red-600 p-6 font-medium">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Tutorials</h2>

      {tutorials.length === 0 ? (
        <p className="text-gray-600 text-lg">No tutorials yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tut) => (
            <div
              key={tut.id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition"
            >
              <Link to={`/tutorials/${tut.id}`} className="text-indigo-600 hover:underline">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tut.title}
              </h3>
              </Link>
              <p className="text-gray-700 mb-3 line-clamp-3">{tut.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Created: {new Date(tut.createdAt).toLocaleDateString()}
              </p>

              
                <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  onClick={() => handleEdit(tut)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                  onClick={() => {
                    setConfirmDelete(tut.id);
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <EditTutorialModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        tutorial={selectedTutorial}
        onUpdated={handleUpdated}
      />

       {/* 🗑️ Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={!!confirmDelete}
        title="Delete Tutorial"
        message="Are you sure you want to delete this tutorial? This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
      />
    </div>
  );
}
