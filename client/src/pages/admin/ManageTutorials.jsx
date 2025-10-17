import { useEffect, useState } from "react";
import api from "../../services/api";
import EditTutorialModal from "../../components/EditTutorialModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

export default function ManageTutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/tutorials");
      setTutorials(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tutorials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/tutorials/${id}`);
      setConfirmDelete(null);
      fetchTutorials();
    } catch (err) {
      console.error("Failed to delete tutorial:", err);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Loading tutorials...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Tutorials
      </h2>

      {tutorials.length === 0 ? (
        <p className="text-gray-600 text-lg">No tutorials found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Title</th>
                <th className="p-4 text-left font-semibold">Author</th>
                <th className="p-4 text-left font-semibold">Created</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tut) => (
                <tr
                  key={tut.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{tut.title}</td>
                  <td className="p-4">{tut.user?.username || "—"}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(tut.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => setEditingTutorial(tut)}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(tut.id)}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🧩 Edit Modal */}
      <EditTutorialModal
        tutorial={editingTutorial}
        open={!!editingTutorial}
        onClose={() => setEditingTutorial(null)}
        onUpdated={fetchTutorials}
      />

      {/* 🗑️ Delete Confirmation */}
      <DeleteConfirmModal
        open={!!confirmDelete}
        title="Delete Tutorial"
        message="Are you sure you want to permanently delete this tutorial? This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
      />
    </div>
  );
}
