import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useTutorialService } from "../services/TutorialService";

export default function EditTutorialModal({ open, onClose, tutorial, onUpdated }) {
  const { update } = useTutorialService();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tutorial) {
      setFormData({
        title: tutorial.title || "",
        description: tutorial.description || "",
      });
    }
  }, [tutorial]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await update(tutorial.id, formData);
      onUpdated(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update tutorial");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <div className="p-6 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Edit Tutorial</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded-md">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter tutorial title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-2.5 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Write something..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
