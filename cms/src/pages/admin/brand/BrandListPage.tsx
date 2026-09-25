import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { deleteRequest, getRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type BrandItem = {
  _id: string;
  name: string;
  status: "active" | "inactive";
  isFeatured?: boolean;
  logo?: { optimizedUrl?: string; originalUrl?: string };
};

export default function BrandListPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getRequest("/brand", {
          params: { search, limit: 100 },
        });
        setBrands(response?.data ?? []);
      } catch (exception) {
        setError(
          (exception as { message?: string })?.message ||
            "Unable to load brands.",
        );
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      const response = (await deleteRequest(`/brand/${id}`)) as any;
      if (response?.status !== "OK")
        throw new Error(response?.message || "Brand was not deleted");
      setBrands((current) => current.filter((brand) => brand._id !== id));
      notifySuccess({ title: "Brand deleted successfully" });
    } catch (exception) {
      notifyError({
        title: "Brand deletion failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Brand Management", url: "/admin/brands" },
          { title: "Brand Listing" },
        ]}
      />
      <PageTitle
        title="Brand Listing Page"
        createBtn={{ title: "Create Brand", url: "/admin/brand/create" }}
      />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={brands.length}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    Loading brands...
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
                  </td>
                </tr>
              )}
              {!loading && !error && brands.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No brands found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                brands.map((brand) => (
                  <tr key={brand._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">{brand.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${brand.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                      >
                        {brand.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {brand.logo?.optimizedUrl || brand.logo?.originalUrl ? (
                        <img
                          src={
                            brand.logo.optimizedUrl || brand.logo.originalUrl
                          }
                          alt={brand.name}
                          className="h-12 w-20 rounded-lg object-contain"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {brand.isFeatured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/brand/${brand._id}/edit`)
                        }
                        className="mr-3 text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDelete(brand._id)}
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
