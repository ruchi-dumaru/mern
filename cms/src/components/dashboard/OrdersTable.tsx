type OrderItem = {
  id: string;
  customer: string;
  total: string;
  status: string;
};

type OrdersTableProps = {
  orders: OrderItem[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Latest Orders</h2>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
          View all
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-3">Order</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-100">
                <td className="px-3 py-3 font-medium">{order.id}</td>
                <td className="px-3 py-3">{order.customer}</td>
                <td className="px-3 py-3">{order.total}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
