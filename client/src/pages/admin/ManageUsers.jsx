import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pencil, Trash2, User } from "lucide-react";
import EditUserModal from "../../components/EditUserModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const fetchUsers = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    await api.delete(`/admin/users/${deleteUserId}`);
    setDeleteUserId(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No users found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Role: {user.role || "User"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-auto">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {setDeleteUserId(user.id);}}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={fetchUsers}
        />
      )}
      <DeleteConfirmModal
        open={!!deleteUserId}
        title={"this user"}
        message={"Do you want to delete this user permanently"}
        onCancel={() => setDeleteUserId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
