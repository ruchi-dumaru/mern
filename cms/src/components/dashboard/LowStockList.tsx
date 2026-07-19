type LowStockItem = {
  name: string;
  stock: number;
};

type LowStockListProps = {
  products: LowStockItem[];
};

const LowStockList = ({ products }: LowStockListProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Low Stock Products</h2>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Restock
        </button>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-slate-500">
                Only {product.stock} left
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Low Stock
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LowStockList;
