import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { deleteRequest, getRequest } from "../../../config/axios.config";
import { notifyError, notifySuccess } from "../../../utilities/helpers";

type BannerItem = {
  _id: string;
  title: string;
  status: "active" | "inactive";
  image?: { optimizedUrl?: string; originalUrl?: string };
  link: string;
};
const PAGE_SIZE = 10;

export default function BannerListPage() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBanners = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/banner", { params: { limit: 100 } });
      setBanners(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message ||
          "Unable to load banners.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBanners();
  }, []);
  const filteredBanners = useMemo(() => {
    const query = search.toLowerCase();
    return banners.filter((banner) =>
      [banner.title, banner.status, banner.link].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [banners, search]);
  const totalPages = Math.max(1, Math.ceil(filteredBanners.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedBanners = filteredBanners.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      const response = (await deleteRequest(`/banner/${id}`)) as any;
      if (response?.status !== "OK")
        throw new Error(response?.message || "Banner was not deleted");
      setBanners((current) => current.filter((banner) => banner._id !== id));
      notifySuccess({ title: "Banner deleted successfully" });
    } catch (exception) {
      notifyError({
        title: "Banner deletion failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Banner Management", url: "/admin/banners" },
          { title: "Banner Listing" },
        ]}
      />
      <PageTitle
        title="Banner Listing Page"
        createBtn={{ title: "Create Banner", url: "/admin/banner/create" }}
      />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          totalItems={filteredBanners.length}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    Loading banners...
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
              {!loading && !error && paginatedBanners.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No banners found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                paginatedBanners.map((banner) => (
                  <tr key={banner._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">{banner.title}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${banner.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                      >
                        {banner.status === "active" ? "Publish" : "Un-Publish"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {banner.image?.optimizedUrl ||
                      banner.image?.originalUrl ? (
                        <img
                          src={
                            banner.image.optimizedUrl ||
                            banner.image.originalUrl
                          }
                          alt={banner.title}
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-slate-500">
                      {banner.link}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/banner/${banner._id}/edit`)
                        }
                        className="mr-3 text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDelete(banner._id)}
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
        {totalPages > 1 && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
            >
              Previous
            </button>
            <span>
              Page {safePage} of {totalPages}
            </span>
            <button
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
