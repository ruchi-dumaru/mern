import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { deleteRequest, getRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type UserItem = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  gender?: string;
  createdAt?: string;
  image?: { optimizedUrl?: string; originalUrl?: string };
};

export default function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/user", {
        params: { search, limit: 100 },
      });
      setUsers(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message || "Failed to load users.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void loadUsers();
  }, [search]);
  const removeUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = (await deleteRequest(`/user/${id}`)) as {
        status?: string;
        message?: string;
      };
      if (response?.status !== "OK")
        throw new Error(response?.message || "User was not deleted");
      setUsers((current) => current.filter((user) => user._id !== id));
      notifySuccess({ title: "User deleted successfully" });
    } catch (exception) {
      notifyError({
        title: "User deletion failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };
  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "User Management", url: "/admin/users" },
          { title: "User Listing" },
        ]}
      />
      <PageTitle
        title="User Management"
        createBtn={{ title: "Create User", url: "/admin/user/create" }}
      />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={users.length}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    Loading users...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-red-600"
                  >
                    {error}
                    <button
                      onClick={() => void loadUsers()}
                      className="ml-3 underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}
              {!loading && !error && users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                users.map((user) => (
                  <tr key={user._id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <span className="font-medium">{user.name}</span>
                      <span className="block text-xs text-slate-500">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.role || "-"}</td>
                    <td className="px-4 py-3">{user.status || "-"}</td>
                    <td className="px-4 py-3">{user.phone || "-"}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="mr-3 text-slate-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                        className="mr-3 text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void removeUser(user._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
