import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, putRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";
import useAuth from "../../../hooks/auth.hook";

type Profile = {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  dob?: string;
  gender?: "male" | "female" | "other";
  role?: string;
  status?: string;
  image?: { optimizedUrl?: string; originalUrl?: string };
};
type ApiResponse = { status?: string; message?: string; data?: Profile };

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { getLoggedInUser } = useAuth();
  const [profile, setProfile] = useState<Profile>();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    dob: "",
    gender: "other" as "male" | "female" | "other",
    role: "customer",
    status: "inactive",
  });
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest("auth/me");
        const user = response.data as Profile;
        setProfile(user);
        setForm({
          name: user.name || "",
          address: user.address || "",
          phone: user.phone || "",
          dob: user.dob ? user.dob.slice(0, 10) : "",
          gender: user.gender || "other",
          role: user.role || "customer",
          status: user.status || "inactive",
        });
      } catch (exception) {
        notifyError({
          title: "Unable to load profile",
          description:
            (exception as { message?: string })?.message || "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.address.trim() || !form.dob) {
      notifyError({ title: "Complete the required profile fields" });
      return;
    }
    try {
      setSaving(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("address", form.address.trim());
      body.append("gender", form.gender);
      body.append("dob", form.dob);
      body.append("phone", form.phone);
      body.append("role", form.role);
      body.append("status", form.status);
      if (image) body.append("image", image);
      const response = (await putRequest(
        `/user/${profile?._id}`,
        body,
      )) as ApiResponse;
      if (response.status !== "OK" || !response.data)
        throw new Error(response.message || "Profile was not updated");
      setProfile(response.data);
      await getLoggedInUser();
      notifySuccess({ title: "Profile updated successfully" });
    } catch (exception) {
      notifyError({
        title: "Profile update failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;
  const imageUrl = profile.image?.optimizedUrl || profile.image?.originalUrl;
  return (
    <div className="space-y-6">
      <BreadCrumbComponent links={[{ title: "My Profile" }]} />
      <PageTitle title="My Profile" />
      <form
        onSubmit={submit}
        className="max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={profile.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-2xl font-bold text-white">
              {profile.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-slate-500">{profile.email}</p>
            <p className="text-sm text-slate-500">
              {profile.role} · {profile.status}
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="font-semibold">
            Name
            <input
              required
              minLength={3}
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="font-semibold">
            Phone
            <input
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="font-semibold sm:col-span-2">
            Address
            <input
              required
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="font-semibold">
            Date of birth
            <input
              required
              type="date"
              value={form.dob}
              onChange={(event) =>
                setForm({ ...form, dob: event.target.value })
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="font-semibold">
            Gender
            <select
              value={form.gender}
              onChange={(event) =>
                setForm({
                  ...form,
                  gender: event.target.value as typeof form.gender,
                })
              }
              className="mt-1 w-full rounded border p-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="font-semibold sm:col-span-2">
            Replace image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files?.[0])}
              className="mt-1 block w-full rounded border p-2"
            />
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded bg-slate-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            type="submit"
            className="rounded bg-slate-800 px-4 py-2 text-white"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
