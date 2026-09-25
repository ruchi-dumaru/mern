import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest, putRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type CategoryOption = { _id: string; name: string };

type CategoryForm = {
  name: string;
  status: "active" | "inactive";
  isFeatured: boolean;
  parentId: string;
  icon?: File;
};

export default function CategoryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<CategoryForm>({
    name: "",
    status: "inactive",
    isFeatured: false,
    parentId: "",
  });
  const [parents, setParents] = useState<CategoryOption[]>([]);
  const [existingIcon, setExistingIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [detailResponse, listResponse] = await Promise.all([
          getRequest(`/category/${id}`),
          getRequest("/category", { params: { limit: 100 } }),
        ]);
        const category = detailResponse.data;
        setForm({
          name: category.name,
          status: category.status,
          isFeatured: Boolean(category.isFeatured),
          parentId: category.parentId?._id || category.parentId || "",
        });
        setExistingIcon(
          category.icon?.optimizedUrl || category.icon?.originalUrl || "",
        );
        setParents(
          (listResponse?.data ?? []).filter(
            (item: CategoryOption) => item._id !== id,
          ),
        );
      } catch (exception) {
        notifyError({
          title: "Unable to load category",
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
    if (!form.name.trim()) {
      notifyError({ title: "Category name is required" });
      return;
    }
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("status", form.status);
      body.append("isFeatured", String(form.isFeatured));
      body.append("parentId", form.parentId);
      if (form.icon) body.append("icon", form.icon);
      const response = (await putRequest(`/category/${id}`, body)) as any;
      if (response?.status !== "OK" || !response?.data)
        throw new Error(response?.message || "Category was not updated");
      notifySuccess({ title: "Category updated successfully" });
      navigate("/admin/categories");
    } catch (exception) {
      notifyError({
        title: "Category update failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading category...</p>;
  return (
    <>
      <BreadCrumbComponent
        links={[
          { title: "Category Management", url: "/admin/categories" },
          { title: "Edit Category" },
        ]}
      />
      <PageTitle title="Edit Category" />
      <form
        onSubmit={submit}
        className="my-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-5"
      >
        <label className="font-semibold">
          Category Name
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-1 w-full rounded p-2"
          />
        </label>
        <label className="font-semibold">
          Parent Category
          <select
            value={form.parentId}
            onChange={(event) =>
              setForm({ ...form, parentId: event.target.value })
            }
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
              checked={form.status === "active"}
              onChange={() => setForm({ ...form, status: "active" })}
            />{" "}
            Active
          </label>
          <label className="ml-5">
            <input
              type="radio"
              checked={form.status === "inactive"}
              onChange={() => setForm({ ...form, status: "inactive" })}
            />{" "}
            Inactive
          </label>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) =>
              setForm({ ...form, isFeatured: event.target.checked })
            }
          />{" "}
          Featured category
        </label>
        {existingIcon && (
          <img
            src={existingIcon}
            alt={form.name}
            className="h-24 w-40 object-contain"
          />
        )}
        <label className="font-semibold">
          Replace icon
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setForm({ ...form, icon: event.target.files?.[0] })
            }
            className="mt-1 block w-full rounded p-2"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
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
