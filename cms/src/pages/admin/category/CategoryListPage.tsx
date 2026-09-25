import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { deleteRequest, getRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type CategoryItem = {
  _id: string;
  name: string;
  status: "active" | "inactive";
  isFeatured?: boolean;
  icon?: { optimizedUrl?: string; originalUrl?: string };
  parentId?: { name?: string } | string | null;
};

export default function CategoryListPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/category", {
        params: { search, limit: 100 },
      });
      setCategories(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message ||
          "Failed to load categories.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const response = (await deleteRequest(`/category/${id}`)) as any;
      if (response?.status !== "OK")
        throw new Error(response?.message || "Category was not deleted");
      setCategories((current) =>
        current.filter((category) => category._id !== id),
      );
      notifySuccess({ title: "Category deleted successfully" });
    } catch (exception) {
      notifyError({
        title: "Category deletion failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Category Management", url: "/admin/categories" },
          { title: "Category Listing" },
        ]}
      />
      <PageTitle
        title="Category Listing Page"
        createBtn={{ title: "Create Category", url: "/admin/category/create" }}
      />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={categories.length}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    Loading categories...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-red-600"
                  >
                    {error}
                    <button
                      onClick={() => void load()}
                      className="ml-3 underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}
              {!loading && !error && categories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                categories.map((category) => (
                  <tr key={category._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">
                      {category.name}
                      {category.isFeatured ? (
                        <span className="ml-2 text-xs text-slate-500">
                          Featured
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {typeof category.parentId === "object"
                        ? category.parentId?.name || "-"
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {category.icon?.optimizedUrl ||
                      category.icon?.originalUrl ? (
                        <img
                          src={
                            category.icon.optimizedUrl ||
                            category.icon.originalUrl
                          }
                          alt={category.name}
                          className="h-12 w-20 rounded-lg object-contain"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${category.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                      >
                        {category.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/category/${category._id}/edit`)
                        }
                        className="mr-3 text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDelete(category._id)}
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
