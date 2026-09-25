import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, postRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type CategoryOption = { _id: string; name: string };

export default function CategoryCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("inactive");
  const [isFeatured, setIsFeatured] = useState(false);
  const [parentId, setParentId] = useState("");
  const [icon, setIcon] = useState<File>();
  const [parents, setParents] = useState<CategoryOption[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadParents = async () => {
      try {
        const response = await getRequest("/category", {
          params: { limit: 100 },
        });
        setParents(response?.data ?? []);
      } catch {
        // Parent selection is optional; creation can continue if it fails.
      }
    };
    void loadParents();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      notifyError({ title: "Category name is required" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", name.trim());
      body.append("status", status);
      body.append("isFeatured", String(isFeatured));
      body.append("parentId", parentId);
      if (icon) body.append("icon", icon);
      const response = (await postRequest("/category", body, {
        file: true,
        auth: true,
      })) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Category was not created");
      notifySuccess({ title: "Category created successfully" });
      navigate("/admin/categories");
    } catch (exception) {
      notifyError({
        title: "Category creation failed",
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
          { title: "Category Management", url: "/admin/categories" },
          { title: "Category Create Page" },
        ]}
      />
      <PageTitle title="Category Create Page" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Category Name
          <input
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Parent Category (optional)
          <select
            value={parentId}
            onChange={(event) => setParentId(event.target.value)}
            className="mt-1 w-full rounded p-2"
          >
            <option value="">None</option>
            {parents.map((parent) => (
              <option key={parent._id} value={parent._id}>
                {parent.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <p className="font-semibold">Status</p>
          <label>
            <input
              type="radio"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />{" "}
            Active
          </label>
          <label className="ml-5">
            <input
              type="radio"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />{" "}
            Inactive
          </label>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
          />{" "}
          Featured category
        </label>
        <label className="font-semibold">
          Icon (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setIcon(event.target.files?.[0])}
            className="mt-1 block w-full rounded p-2"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            disabled={submitting}
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
