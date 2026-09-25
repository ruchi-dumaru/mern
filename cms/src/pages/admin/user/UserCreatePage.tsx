import { useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { postRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type ApiResponse = { status?: string; message?: string; data?: unknown };
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,25}$/;

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [image, setImage] = useState<File>();
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !passwordPattern.test(password) ||
      password !== confirmPassword ||
      !image
    ) {
      notifyError({
        title: "Complete the required fields",
        description: "Use a strong matching password and select an image.",
      });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", name.trim());
      body.append("email", email.trim());
      body.append("password", password);
      body.append("confirmPassword", confirmPassword);
      body.append("role", role);
      body.append("image", image);
      const response = (await postRequest("/user", body, {
        file: true,
        auth: true,
      })) as ApiResponse;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "User was not created");
      notifySuccess({ title: "User created successfully" });
      navigate("/admin/users");
    } catch (exception) {
      notifyError({
        title: "User creation failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "User Management", url: "/admin/users" },
          { title: "Create User" },
        ]}
      />
      <PageTitle title="Create User" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Name
          <input
            required
            minLength={3}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Confirm Password
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-1 w-full rounded p-2"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>
        <label className="font-semibold">
          Image
          <input
            required
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0])}
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
            {submitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
