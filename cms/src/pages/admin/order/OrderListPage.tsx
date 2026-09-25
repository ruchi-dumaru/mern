import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { getRequest } from "../../../config/axios.config";

type Buyer = { name?: string; email?: string };
type OrderItem = {
  _id: string;
  orderCode: string;
  buyer?: Buyer;
  total: number;
  isPaid?: boolean;
  status?: string;
  createdAt?: string;
};
const amount = (value?: number) =>
  typeof value === "number" ? `Rs. ${(value / 100).toFixed(2)}` : "-";

export default function OrderListPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/order");
      setOrders(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message ||
          "Failed to load orders.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void loadOrders();
  }, []);

  const visibleOrders = orders.filter((order) =>
    [order.orderCode, order.buyer?.name, order.buyer?.email]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Order Management", url: "/admin/orders" },
          { title: "Order Listing" },
        ]}
      />
      <PageTitle title="Order Listing Page" />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={visibleOrders.length}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    Loading orders...
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
                      onClick={() => void loadOrders()}
                      className="ml-3 underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}
              {!loading && !error && visibleOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                visibleOrders.map((order) => (
                  <tr key={order._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">
                      {order.orderCode || order._id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      {order.buyer?.name || "-"}
                      <span className="block text-xs text-slate-500">
                        {order.buyer?.email || ""}
                      </span>
                    </td>
                    <td className="px-4 py-3">{amount(order.total)}</td>
                    <td className="px-4 py-3">
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                        {order.status || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                        className="text-indigo-600"
                      >
                        View
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
