type BannerItem = {
  id: number;
  title: string;
  status: "Active" | "Inactive";
  image: string;
  url: string;
};

type BannerTableProps = {
  banners: BannerItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const BannerTable = ({
  banners,
  page,
  totalPages,
  onPageChange,
}: BannerTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
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
            {banners.map((banner) => (
              <tr key={banner.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-700">
                  {banner.title}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${banner.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                  >
                    {banner.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-12 w-20 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3 text-slate-500">{banner.url}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
                      Edit
                    </button>
                    <button className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous page"
          >
            <span className="text-base">←</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`h-9 w-9 rounded-lg border text-sm font-semibold ${pageNumber === page ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next page"
          >
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerTable;
