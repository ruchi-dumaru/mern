import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { PageSearch } from "../page-settings/PageSearch";
import { getRequest } from "../../../config/axios.config";

type Buyer = { name?: string; email?: string };
type OrderPayment = {
  _id: string;
  orderCode?: string;
  buyer?: Buyer;
  total?: number;
  isPaid?: boolean;
  paymentPidx?: string | null;
  paymentStatus?: string | null;
  paymentTransactionId?: string | null;
  paymentAmount?: number | null;
  paymentMethod?: string | null;
  paymentCompletedAt?: string | null;
  createdAt?: string;
};

const formatAmount = (value?: number | null) =>
  typeof value === "number" ? `Rs. ${(value / 100).toFixed(2)}` : "-";

const formatStatus = (order: OrderPayment) =>
  order.paymentStatus || (order.isPaid ? "paid" : "unpaid");

export default function TransactionListPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderPayment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRequest("/order");
      setOrders(response?.data ?? []);
    } catch (exception) {
      setError(
        (exception as { message?: string })?.message ||
          "Failed to load transactions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTransactions();
  }, []);

  const transactions = useMemo(() => {
    const query = search.toLowerCase();
    return orders.filter((order) =>
      [
        order.orderCode,
        order.buyer?.name,
        order.buyer?.email,
        order.paymentPidx,
        order.paymentTransactionId,
        order.paymentMethod,
        order.paymentStatus,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query)),
    );
  }, [orders, search]);

  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Transaction Management", url: "/admin/transactions" },
          { title: "Transaction Listing" },
        ]}
      />
      <PageTitle title="Transaction Management" />
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <PageSearch
          search={search}
          setSearch={setSearch}
          setPage={() => undefined}
          totalItems={transactions.length}
          placeholder="Search orders, customers, or payment reference..."
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    Loading transactions...
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
                      onClick={() => void loadTransactions()}
                      className="ml-3 underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}
              {!loading && !error && transactions.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-medium">
                      {transaction.orderCode || transaction._id}
                      <span className="block text-xs text-slate-500">
                        {transaction.paymentTransactionId ||
                          transaction.paymentPidx ||
                          "No payment reference"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {transaction.buyer?.name || "-"}
                      <span className="block text-xs text-slate-500">
                        {transaction.buyer?.email || ""}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {formatAmount(
                        transaction.paymentAmount ?? transaction.total,
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {transaction.paymentMethod || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${transaction.isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {formatStatus(transaction)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {transaction.paymentCompletedAt
                        ? new Date(
                            transaction.paymentCompletedAt,
                          ).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/orders/${transaction._id}`)
                        }
                        className="text-indigo-600"
                      >
                        View Order
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
