import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { getRequest } from "../../../config/axios.config";
import { notifyError } from "../../../utilities/helpers";

type Product = {
  name?: string;
  images?: { optimizedUrl?: string; originalUrl?: string }[];
};
type Buyer = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};
type Detail = {
  _id: string;
  order?: {
    _id?: string;
    orderCode?: string;
    subtotal?: number;
    tax?: number;
    serviceCharge?: number;
    deliveryCharge?: number;
    total?: number;
    isPaid?: boolean;
    status?: string;
    createdAt?: string;
  };
  product?: Product;
  buyer?: Buyer;
  quantity?: number;
  price?: number;
  subtotal?: number;
  tax?: number;
  total?: number;
};
const amount = (value?: number) =>
  typeof value === "number" ? `Rs. ${(value / 100).toFixed(2)}` : "-";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const load = async () => {
      try {
        const response = await getRequest(`/order/${id}`);
        setDetails(response?.data ?? []);
      } catch (exception) {
        const message =
          (exception as { message?: string })?.message ||
          "Failed to load order details.";
        setError(message);
        notifyError({ title: "Unable to load order", description: message });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);
  if (loading) return <p>Loading order details...</p>;
  if (error || details.length === 0)
    return (
      <div className="space-y-4">
        <PageTitle title="Order Details" />
        <p className="text-red-600">{error || "Order not found."}</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="rounded bg-slate-900 px-4 py-2 text-white"
        >
          Back to Orders
        </button>
      </div>
    );
  const first = details[0];
  const order = first.order;
  const image =
    first.product?.images?.[0]?.optimizedUrl ||
    first.product?.images?.[0]?.originalUrl;
  return (
    <div className="space-y-6">
      <BreadCrumbComponent
        links={[
          { title: "Order Management", url: "/admin/orders" },
          { title: "Order Details" },
        ]}
      />
      <PageTitle title="Order Details" />
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Order Information</h2>
          <p>
            <strong>Order ID:</strong> {order?.orderCode || order?._id || id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "-"}
          </p>
          <p>
            <strong>Status:</strong> {order?.status || "-"}
          </p>
          <p>
            <strong>Payment:</strong> {order?.isPaid ? "Paid" : "Unpaid"}
          </p>
          <p>
            <strong>Total:</strong> {amount(order?.total)}
          </p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>
          <p>
            <strong>Name:</strong> {first.buyer?.name || "-"}
          </p>
          <p>
            <strong>Email:</strong> {first.buyer?.email || "-"}
          </p>
          <p>
            <strong>Phone:</strong> {first.buyer?.phone || "-"}
          </p>
          <p>
            <strong>Address:</strong> {first.buyer?.address || "-"}
          </p>
        </section>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item) => (
                <tr key={item._id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    {item.product?.name || "-"}
                    {image && item === first && (
                      <img
                        src={image}
                        alt={item.product?.name || "Product"}
                        className="ml-3 inline-block h-10 w-10 rounded object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">{amount(item.price)}</td>
                  <td className="px-4 py-3">{item.quantity || "-"}</td>
                  <td className="px-4 py-3">{amount(item.subtotal)}</td>
                  <td className="px-4 py-3">{amount(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <button
        onClick={() => navigate("/admin/orders")}
        className="rounded bg-slate-900 px-4 py-2 text-white"
      >
        Back to Orders
      </button>
    </div>
  );
}
