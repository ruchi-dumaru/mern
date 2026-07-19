import { useMemo, useState } from "react";
import { Link } from "react-router";
import BannerTable from "../../../components/banner/BannerTable";

type BannerItem = {
  id: number;
  title: string;
  status: "Active" | "Inactive";
  image: string;
  url: string;
};

const allBanners: BannerItem[] = [
  {
    id: 1,
    title: "Summer Sale",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    url: "https://example.com/summer-sale",
  },
  {
    id: 2,
    title: "New Arrivals",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    url: "https://example.com/new-arrivals",
  },
  {
    id: 3,
    title: "Winter Collection",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=400&q=80",
    url: "https://example.com/winter-collection",
  },
  {
    id: 4,
    title: "Flash Offer",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    url: "https://example.com/flash-offer",
  },
  {
    id: 5,
    title: "Holiday Deal",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80",
    url: "https://example.com/holiday-deal",
  },
];

const PAGE_SIZE = 3;

export default function BannerListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredBanners = useMemo(() => {
    const query = search.toLowerCase();
    return allBanners.filter((banner) =>
      [banner.title, banner.status, banner.url].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredBanners.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedBanners = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredBanners.slice(start, start + PAGE_SIZE);
  }, [filteredBanners, safePage]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="text-sm text-slate-500">
            <Link to="/admin" className="text-slate-600 hover:text-slate-900">
              Admin
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/admin/banners"
              className="text-slate-600 hover:text-slate-900"
            >
              Banners
            </Link>
          </nav>
          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Banner List
          </h1>
        </div>

        <Link
          to="/admin/banners/create"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Create Banner
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search banners"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-400"
            />
          </div>
          <p className="text-sm text-slate-500">
            {filteredBanners.length} items found
          </p>
        </div>

        <BannerTable
          banners={paginatedBanners}
          page={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
