import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest } from "../../../config/axios.config";
import { notifyError } from "../../../utilities/helpers";

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  address?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  image?: { optimizedUrl?: string; originalUrl?: string };
};
export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest(`/user/${id}`);
        setUser(response?.data);
      } catch (exception) {
        const message =
          (exception as { message?: string })?.message ||
          "Failed to load user details.";
        setError(message);
        notifyError({ title: "Unable to load user", description: message });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);
  if (loading) return <p>Loading user details...</p>;
  if (!user)
    return (
      <div>
        <PageTitle title="User Details" />
        <p className="text-red-600">{error || "User not found."}</p>
      </div>
    );
  const image = user.image?.optimizedUrl || user.image?.originalUrl;
  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "User Management", url: "/admin/users" },
          { title: "User Details" },
        ]}
      />
      <PageTitle title="User Details" />
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        {image && (
          <img
            src={image}
            alt={user.name}
            className="mb-5 h-24 w-24 rounded-full object-cover"
          />
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "-"}
          </p>
          <p>
            <strong>Status:</strong> {user.status || "-"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "-"}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "-"}
          </p>
          <p>
            <strong>Date of birth:</strong>{" "}
            {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
          </p>
          <p>
            <strong>Address:</strong> {user.address || "-"}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/users")}
          className="mt-6 rounded bg-slate-900 px-4 py-2 text-white"
        >
          Back to Users
        </button>
      </div>
    </div>
  );
}
