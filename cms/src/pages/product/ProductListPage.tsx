import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../admin/page-settings/Breadcrumb";
import { PageTitle } from "../admin/page-settings/PageTitle";
import { PageSearch } from "../admin/page-settings/PageSearch";
import { deleteRequest, getRequest } from "../../config/axios.config";
import { notifyError, notifySuccess } from "../../utilities/helpers";

type ProductItem = {
  _id: string;
  name: string;
  status: "active" | "inactive";
  price: number;
  discount: number;
  afterDiscountAmount: number;
  isFeatured?: boolean;
  images?: { optimizedUrl?: string; originalUrl?: string }[];
  category?: { name?: string }[] | string[];
  brand?: { name?: string } | string | null;
};
const money = (value: number) => `Rs. ${(value / 100).toFixed(2)}`;

export default function ProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/product", {
        params: { search, limit: 100 },
      });
      setProducts(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message ||
          "Failed to load products.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void load();
  }, [search]);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = (await deleteRequest(`/product/${id}`)) as any;
      if (response?.status !== "OK")
        throw new Error(response?.message || "Product was not deleted");
      setProducts((current) => current.filter((product) => product._id !== id));
      notifySuccess({ title: "Product deleted successfully" });
    } catch (exception) {
      notifyError({
        title: "Product deletion failed",
        description:
          (exception as { message?: string })?.message || "Please try again.",
      });
    }
  };
  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Product Management", url: "/admin/products" },
          { title: "Product Listing" },
        ]}
      />
      <PageTitle
        title="Product Listing Page"
        createBtn={{ title: "Create Product", url: "/admin/product/create" }}
      />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={products.length}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    Loading products...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={7}
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
              {!loading && !error && products.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                products.map((product) => {
                  const image =
                    product.images?.[0]?.optimizedUrl ||
                    product.images?.[0]?.originalUrl;
                  const category = Array.isArray(product.category)
                    ? product.category
                        .map((item) =>
                          typeof item === "object" ? item.name : item,
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "-";
                  const brand =
                    typeof product.brand === "object"
                      ? product.brand?.name
                      : product.brand;
                  return (
                    <tr key={product._id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            className="h-12 w-16 rounded object-cover"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {category || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {brand || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {money(product.afterDiscountAmount || product.price)}
                      </td>
                      <td className="px-4 py-3">
                        {product.status === "active" ? "Active" : "Inactive"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className="mr-3 text-indigo-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => void handleDelete(product._id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
