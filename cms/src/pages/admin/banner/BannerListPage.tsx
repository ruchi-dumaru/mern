
import { useMemo, useState } from "react";
import BannerTable from "../../../components/banner/BannerTable";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";

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
        value.toLowerCase().includes(query)
      )
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBanners.length / PAGE_SIZE)
  );

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
      <BreadCrumbComponent
        links={[
          {
            title: "Banner Management",
            url: "/admin/banner",
          },
          {
            title: "Banner Listing",
          },
        ]}
      />

      <PageTitle
        title="Banner Listing Page"
        createBtn={{
          title: "Create Banner",
          url: "/admin/banner/create",
        }}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          totalItems={filteredBanners.length}
        />

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