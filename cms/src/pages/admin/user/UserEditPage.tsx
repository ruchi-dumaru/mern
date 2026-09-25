import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, putRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type UserForm = {
  name: string;
  address: string;
  gender: "male" | "female" | "other";
  dob: string;
  role: "admin" | "seller" | "customer";
  phone: string;
  status: "active" | "inactive";
  image?: File;
};
type ApiResponse = { status?: string; message?: string; data?: unknown };

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<UserForm>({
    name: "",
    address: "",
    gender: "other",
    dob: "",
    role: "customer",
    phone: "",
    status: "inactive",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest(`/user/${id}`);
        const user = response.data;
        setForm({
          name: user.name || "",
          address: user.address || "",
          gender: user.gender || "other",
          dob: user.dob ? String(user.dob).slice(0, 10) : "",
          role: user.role || "customer",
          phone: user.phone || "",
          status: user.status || "inactive",
        });
        setImageUrl(user.image?.optimizedUrl || user.image?.originalUrl || "");
      } catch (exception) {
        notifyError({
          title: "Unable to load user",
          description:
            (exception as { message?: string })?.message || "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.address.trim() || !form.dob) {
      notifyError({ title: "Complete the required user fields" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("address", form.address.trim());
      body.append("gender", form.gender);
      body.append("dob", form.dob);
      body.append("role", form.role);
      body.append("phone", form.phone);
      body.append("status", form.status);
      if (form.image) body.append("image", form.image);
      const response = (await putRequest(`/user/${id}`, body)) as ApiResponse;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "User was not updated");
      notifySuccess({ title: "User updated successfully" });
      navigate("/admin/users");
    } catch (exception) {
      notifyError({
        title: "User update failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <p>Loading user...</p>;
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "User Management", url: "/admin/users" },
          { title: "Edit User" },
        ]}
      />
      <PageTitle title="Edit User" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Name
          <input
            required
            minLength={3}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Address
          <input
            required
            value={form.address}
            onChange={(event) =>
              setForm({ ...form, address: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Phone
          <input
            value={form.phone}
            onChange={(event) =>
              setForm({ ...form, phone: event.target.value })
            }
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Date of birth
          <input
            required
            type="date"
            value={form.dob}
            onChange={(event) => setForm({ ...form, dob: event.target.value })}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Gender
          <select
            value={form.gender}
            onChange={(event) =>
              setForm({
                ...form,
                gender: event.target.value as UserForm["gender"],
              })
            }
            className="mt-1 w-full rounded p-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="font-semibold">
          Role
          <select
            value={form.role}
            onChange={(event) =>
              setForm({ ...form, role: event.target.value as UserForm["role"] })
            }
            className="mt-1 w-full rounded p-2"
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <label className="font-semibold">
          Status
          <select
            value={form.status}
            onChange={(event) =>
              setForm({
                ...form,
                status: event.target.value as UserForm["status"],
              })
            }
            className="mt-1 w-full rounded p-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={form.name}
            className="h-24 w-24 rounded-full object-cover"
          />
        )}
        <label className="font-semibold">
          Replace image
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setForm({ ...form, image: event.target.files?.[0] })
            }
            className="mt-1 block w-full rounded p-2"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="mr-4 rounded bg-red-900 p-2 text-white"
          >
            Cancel
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="rounded bg-green-700 p-2 text-white"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
