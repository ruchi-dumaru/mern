
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
  const [loading,setLoading]=useState<boolean>(true)
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

//search bar
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

        {/* <BannerTable
          banners={paginatedBanners}
          page={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}

<div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"> 
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> 
    {/* Table Header Setup */}
    <thead className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
      <tr>
        <th scope="col" className="px-6 py-3">Title</th>
        <th scope="col" className="px-6 py-3">Status</th>
        <th scope="col" className="px-6 py-3">Image</th>
        <th scope="col" className="px-6 py-3">Url</th>
        <th scope="col" className="px-6 py-3 text-right">Actions</th>
      </tr>
    </thead> 

    {/* Table Body Control */}
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-sm text-gray-900 dark:text-gray-100"> 
      {loading ? (
        <tr>
          <td colSpan={5} className="px-6 py-10 text-center">
            <loading />
          </td>
        </tr>
      ) : paginatedBanners.length === 0 ? (
        /* UI match garna "No banners found" handling clause template */
        <tr>
          <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
            No banners found.
          </td>
        </tr>
      ) : ( 
        paginatedBanners.map((banner) => ( 
          <tr key={banner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50"> 
            <td className="px-6 py-4 whitespace-nowrap font-medium">{banner.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${banner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {banner.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {banner.image ? (
                <img src={banner.image} alt={banner.title} className="h-10 w-20 object-cover rounded" />
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{banner.url}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
              <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 mr-3">Edit</button>
              <button className="text-red-600 hover:text-red-900 dark:text-red-400">Delete</button>
            </td>
          </tr> 
        )) 
      )} 
    </tbody> 
  </table> 
</div>


      </div>
    </div>
  );
}


